
import { Body, Controller, Post, Param, Get } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { AddOrderItemDto } from './dto/add-order-item.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.createOrder(createOrderDto);
  }

  @Post(':orderId/items')
  addOrderItem(@Param('orderId') orderId: number, @Body() addOrderItemDto: AddOrderItemDto) {
    return this.orderService.addOrderItem(orderId, addOrderItemDto);
  }

  @Post(':orderId/multiple-items')
  addMultipleOrderItems(@Param('orderId') orderId: number, @Body() itemsDto: AddOrderItemDto[]) {
    return this.orderService.addMultipleOrderItems(orderId, itemsDto);
  }
}
