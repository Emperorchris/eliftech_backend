import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FilterProductsDto } from './dto/filter-products.dto';
import { ProductsService } from './products.service';

@ApiTags('Products')
@Controller('shops/:shopId')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('products')
  @ApiOperation({
    summary: 'Get products for a shop',
    description: 'Returns paginated products for a shop with optional filtering and sorting',
  })
  @ApiParam({ name: 'shopId', description: 'Shop ID (MongoDB ObjectId)' })
  @ApiResponse({ status: 200, description: 'Paginated products returned successfully' })
  @ApiResponse({ status: 404, description: 'Shop not found' })
  findByShop(@Param('shopId') shopId: string, @Query() filterDto: FilterProductsDto) {
    return this.productsService.findByShop(shopId, filterDto);
  }

  @Get('categories')
  @ApiOperation({ summary: 'Get distinct categories for a shop' })
  @ApiParam({ name: 'shopId', description: 'Shop ID (MongoDB ObjectId)' })
  @ApiResponse({ status: 200, description: 'List of categories returned successfully' })
  @ApiResponse({ status: 404, description: 'Shop not found' })
  findCategories(@Param('shopId') shopId: string) {
    return this.productsService.findCategories(shopId);
  }
}
