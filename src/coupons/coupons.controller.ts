import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CouponsService } from './coupons.service';
import { ValidateCouponDto } from './dto/validate-coupon.dto';

@ApiTags('Coupons')
@Controller('coupons')
export class CouponsController {
  constructor(private readonly couponsService: CouponsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all active coupons' })
  @ApiResponse({ status: 200, description: 'List of active coupons returned successfully' })
  findAllActive() {
    return this.couponsService.findAllActive();
  }

  @Post('validate')
  @ApiOperation({ summary: 'Validate a coupon code' })
  @ApiBody({ type: ValidateCouponDto })
  @ApiResponse({ status: 200, description: 'Coupon is valid and details are returned' })
  @ApiResponse({ status: 400, description: 'Coupon is invalid or expired' })
  validate(@Body() validateCouponDto: ValidateCouponDto) {
    return this.couponsService.validate(validateCouponDto);
  }
}
