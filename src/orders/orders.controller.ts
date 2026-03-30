import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateOrderDto } from './dto/create-order.dto';
import { FindOrdersDto } from './dto/find-orders.dto';
import { OrdersService } from './orders.service';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new order' })
  @ApiBody({ type: CreateOrderDto })
  @ApiResponse({ status: 201, description: 'Order created successfully' })
  @ApiResponse({ status: 400, description: 'Validation error or invalid coupon' })
  @ApiResponse({ status: 404, description: 'Shop or product not found' })
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get('history')
  @ApiOperation({
    summary: 'Get order history',
    description: 'Returns orders matching the provided orderId or email',
  })
  @ApiQuery({ name: 'email', required: false, description: 'Customer email' })
  @ApiQuery({ name: 'orderId', required: false, description: 'Order ID' })
  @ApiResponse({ status: 200, description: 'Order history returned successfully' })
  @ApiResponse({ status: 400, description: 'Invalid query parameters' })
  findHistory(@Query() findOrdersDto: FindOrdersDto) {
    return this.ordersService.findHistory(findOrdersDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single order by ID' })
  @ApiParam({ name: 'id', description: 'Order ID (MongoDB ObjectId)' })
  @ApiResponse({ status: 200, description: 'Order returned successfully' })
  @ApiResponse({ status: 404, description: 'Order not found' })
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }
}
