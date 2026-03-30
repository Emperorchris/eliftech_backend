import { ApiProperty } from '@nestjs/swagger';
import { Product } from '@prisma/client';

export class PaginatedProductsDto {
  @ApiProperty({ description: 'Array of products', type: 'array' })
  data: Product[];

  @ApiProperty({ description: 'Total number of products matching the filter' })
  total: number;

  @ApiProperty({ description: 'Current page number' })
  page: number;

  @ApiProperty({ description: 'Items per page' })
  limit: number;

  @ApiProperty({ description: 'Total number of pages' })
  totalPages: number;
}
