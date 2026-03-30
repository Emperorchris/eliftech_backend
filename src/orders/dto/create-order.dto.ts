import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  Min,
  ValidateNested,
} from 'class-validator';

export class OrderItemDto {
  @ApiProperty({ description: 'Product ID (MongoDB ObjectId)' })
  @IsString()
  @IsNotEmpty()
  productId: string;

  @ApiProperty({ description: 'Quantity of the product', minimum: 1 })
  @IsInt()
  @Min(1)
  quantity: number;
}

export class CreateOrderDto {
  @ApiProperty({ description: 'Full name of the customer' })
  @IsString()
  @IsNotEmpty()
  customerName: string;

  @ApiProperty({ description: 'Customer email address', example: 'customer@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Customer phone number', example: '+380991234567' })
  @IsString()
  @Matches(/^\+?[0-9]{7,15}$/, {
    message: 'Phone must be a valid phone number (7-15 digits, optional leading +)',
  })
  phone: string;

  @ApiProperty({ description: 'Delivery address' })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ description: 'Shop ID (MongoDB ObjectId)' })
  @IsString()
  @IsNotEmpty()
  shopId: string;

  @ApiProperty({ description: 'Array of order items', type: [OrderItemDto] })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];

  @ApiPropertyOptional({ description: 'Optional coupon code for discount', example: 'SAVE10' })
  @IsOptional()
  @IsString()
  couponCode?: string;
}
