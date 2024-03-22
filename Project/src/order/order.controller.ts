// src/orders/order.controller.ts

import { Body, Controller, Post, Param, UseGuards, ValidationPipe } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { AddOrderItemDto } from './dto/add-order-item.dto';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { SetSchemaGuard } from 'src/guards/schema.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { CheckProductGuard } from 'src/middleware/check-product.middleware';

@Controller('order')
@UseGuards(JwtAuthGuard,SetSchemaGuard, new RoleGuard(['owner','salesman']))
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  createOrder(@Body(ValidationPipe) createOrderDto: CreateOrderDto) {
    return this.orderService.createOrder(createOrderDto);
  }

  @Post(':orderId/items')
  @UseGuards(CheckProductGuard)
  addOrderItems(@Param('orderId') orderId: number, @Body(ValidationPipe) itemsDto: AddOrderItemDto[]) {
    return this.orderService.addOrderItems(orderId, itemsDto);
  }
}
