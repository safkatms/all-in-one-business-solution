// src/payment/payment.controller.ts

import { Body, Controller, Post, UseGuards, Req, ValidationPipe } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto'; 
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { RoleGuard } from 'src/guards/role.guard';

@Controller('payments')
@UseGuards(JwtAuthGuard,new RoleGuard(['owner']))
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  makePayment(@Req() req, @Body(ValidationPipe) createPaymentDto: CreatePaymentDto) {
    const userId = req.user.userId; 
    return this.paymentService.makePayment(userId, createPaymentDto);
  }
}
