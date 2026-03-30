import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Order } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { FindOrdersDto } from './dto/find-orders.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const { customerName, email, phone, address, shopId, items, couponCode } = createOrderDto;

    // Verify shop exists
    const shop = await this.prisma.shop.findUnique({ where: { id: shopId } });
    if (!shop) {
      throw new NotFoundException(`Shop with id "${shopId}" not found`);
    }

    // Look up each product and calculate total
    const resolvedItems = await Promise.all(
      items.map(async ({ productId, quantity }) => {
        const product = await this.prisma.product.findFirst({
          where: { id: productId, shopId },
        });
        if (!product) {
          throw new NotFoundException(
            `Product "${productId}" not found in shop "${shopId}"`,
          );
        }
        return {
          productId,
          productName: product.name,
          price: product.price,
          quantity,
        };
      }),
    );

    const subtotal = resolvedItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    // Handle coupon
    let discount = 0;
    let appliedCouponCode: string | undefined;

    if (couponCode) {
      const coupon = await this.prisma.coupon.findUnique({
        where: { code: couponCode },
      });

      if (!coupon || !coupon.isActive) {
        throw new BadRequestException(
          `Coupon "${couponCode}" is invalid or has expired`,
        );
      }

      discount = (subtotal * coupon.discountPercent) / 100;
      appliedCouponCode = couponCode;
    }

    const totalPrice = Math.max(0, subtotal - discount);

    return this.prisma.order.create({
      data: {
        customerName,
        email,
        phone,
        address,
        shopId,
        items: resolvedItems,
        couponCode: appliedCouponCode,
        discount,
        totalPrice,
      },
    });
  }

  async findHistory(findOrdersDto: FindOrdersDto): Promise<Order[]> {
    const { email, phone, orderId } = findOrdersDto;

    if (orderId) {
      const order = await this.prisma.order.findUnique({
        where: { id: orderId },
      });
      return order ? [order] : [];
    }

    if (!email) {
      throw new BadRequestException(
        'Either orderId or email is required',
      );
    }

    return this.prisma.order.findMany({
      where: { email },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string): Promise<Order> {
    const order = await this.prisma.order.findUnique({ where: { id } });

    if (!order) {
      throw new NotFoundException(`Order with id "${id}" not found`);
    }

    return order;
  }
}
