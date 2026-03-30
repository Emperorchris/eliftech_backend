import { BadRequestException, Injectable } from '@nestjs/common';
import { Coupon } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { ValidateCouponDto } from './dto/validate-coupon.dto';

@Injectable()
export class CouponsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllActive(): Promise<Coupon[]> {
    return this.prisma.coupon.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async validate(validateCouponDto: ValidateCouponDto): Promise<Coupon> {
    const { code } = validateCouponDto;

    const coupon = await this.prisma.coupon.findUnique({
      where: { code },
    });

    if (!coupon || !coupon.isActive) {
      throw new BadRequestException(
        `Coupon "${code}" is invalid or has expired`,
      );
    }

    return coupon;
  }
}
