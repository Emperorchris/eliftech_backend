import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ValidateCouponDto {
  @ApiProperty({ description: 'Coupon code to validate', example: 'SAVE10' })
  @IsString()
  @IsNotEmpty()
  code: string;
}
