import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { ShopsService } from '../shops/shops.service';
import { FilterProductsDto } from './dto/filter-products.dto';
import { PaginatedProductsDto } from './dto/paginated-products.dto';

@Injectable()
export class ProductsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly shopsService: ShopsService,
  ) {}

  async findByShop(shopId: string, filterDto: FilterProductsDto): Promise<PaginatedProductsDto> {
    // Verify shop exists
    await this.shopsService.findOne(shopId);

    const { category, sortBy, page = 1, limit = 10 } = filterDto;

    const where: Prisma.ProductWhereInput = { shopId };

    if (category) {
      const categories = category.split(',').map((c) => c.trim());
      if (categories.length === 1) {
        where.category = categories[0];
      } else {
        where.category = { in: categories };
      }
    }

    let orderBy: Prisma.ProductOrderByWithRelationInput = { createdAt: 'desc' };
    if (sortBy === 'price_asc') orderBy = { price: 'asc' };
    else if (sortBy === 'price_desc') orderBy = { price: 'desc' };
    else if (sortBy === 'name_asc') orderBy = { name: 'asc' };

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.product.findMany({ where, orderBy, skip, take: limit }),
      this.prisma.product.count({ where }),
    ]);

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findCategories(shopId: string): Promise<string[]> {
    // Verify shop exists
    await this.shopsService.findOne(shopId);

    const products = await this.prisma.product.findMany({
      where: { shopId },
      select: { category: true },
      distinct: ['category'],
    });

    return products.map((p) => p.category).sort();
  }

  async findOneByShop(shopId: string, productId: string) {
    const product = await this.prisma.product.findFirst({
      where: { id: productId, shopId },
    });

    if (!product) {
      throw new NotFoundException(`Product "${productId}" not found in shop "${shopId}"`);
    }

    return product;
  }
}
