import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../../common/dto/pagination.dto';

export type SortByOption = 'price_asc' | 'price_desc' | 'name_asc';

export class FilterProductsDto extends PaginationDto {
  @ApiPropertyOptional({
    description: 'Filter by category. Supports comma-separated values (e.g. "Burgers,Pizza")',
    example: 'Burgers,Drinks',
  })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional({
    description: 'Sort order',
    enum: ['price_asc', 'price_desc', 'name_asc'],
  })
  @IsOptional()
  @IsIn(['price_asc', 'price_desc', 'name_asc'])
  sortBy?: SortByOption;
}
