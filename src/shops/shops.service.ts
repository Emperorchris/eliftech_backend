import { Injectable, NotFoundException } from '@nestjs/common';
import { Shop } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { FilterShopsDto } from './dto/filter-shops.dto';

@Injectable()
export class ShopsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(filterDto: FilterShopsDto): Promise<Shop[]> {
    const { minRating, maxRating } = filterDto;

    return this.prisma.shop.findMany({
      where: {
        rating: {
          ...(minRating !== undefined && { gte: minRating }),
          ...(maxRating !== undefined && { lte: maxRating }),
        },
      },
      select: {
        id: true,
        name: true,
        imageUrl: true,
        rating: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findOne(id: string): Promise<Shop> {
    const shop = await this.prisma.shop.findUnique({
      where: { id },
    });

    if (!shop) {
      throw new NotFoundException(`Shop with id "${id}" not found`);
    }

    return shop;
  }
}
