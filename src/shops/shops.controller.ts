import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FilterShopsDto } from './dto/filter-shops.dto';
import { ShopsService } from './shops.service';

@ApiTags('Shops')
@Controller('shops')
export class ShopsController {
  constructor(private readonly shopsService: ShopsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all shops', description: 'Returns a list of all shops with optional rating filters' })
  @ApiResponse({ status: 200, description: 'List of shops returned successfully' })
  findAll(@Query() filterDto: FilterShopsDto) {
    return this.shopsService.findAll(filterDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a shop by ID' })
  @ApiParam({ name: 'id', description: 'Shop ID (MongoDB ObjectId)' })
  @ApiResponse({ status: 200, description: 'Shop details returned successfully' })
  @ApiResponse({ status: 404, description: 'Shop not found' })
  findOne(@Param('id') id: string) {
    return this.shopsService.findOne(id);
  }
}
