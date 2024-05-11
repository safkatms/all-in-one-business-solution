import { Body, Controller, Post, UseGuards, Req, ValidationPipe } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiTags, ApiBadRequestResponse, ApiUnauthorizedResponse, ApiInternalServerErrorResponse, ApiOperation } from '@nestjs/swagger';

@ApiBearerAuth('access-token')
@ApiTags('Payments')
@Controller('payments')
@UseGuards(JwtAuthGuard, new RoleGuard(['owner']))
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @ApiOperation({ summary: 'Make a payment' })
  @Post()
  @ApiBody({ type: CreatePaymentDto })
  @ApiCreatedResponse({ description: 'Payment successfully processed' })
  @ApiBadRequestResponse({ description: 'Invalid request payload' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  makePayment(@Req() req, @Body(ValidationPipe) createPaymentDto: CreatePaymentDto) {
    const userId = req.user.userId;
    return this.paymentService.makePayment(userId, createPaymentDto);
  }
}
