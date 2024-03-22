// src/orders/order.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { AddOrderItemDto } from './dto/add-order-item.dto';
import { InventoryManagement } from 'src/inventory-management/entities/inventory-management.entity';
import { Customer } from 'src/customer/entities/customer.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
    @InjectRepository(InventoryManagement)
    private readonly inventoryRepository: Repository<InventoryManagement>,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async createOrder(
    userName: string,
    createOrderDto: CreateOrderDto,
  ): Promise<any> {
    const customer = await this.customerRepository.findOne({
      where: { contact: createOrderDto.customerContact },
    });

    if (!customer) {
      // If no customer is found with the provided contact, return a message indicating the issue.
      return {
        message:
          'Order creation failed: Customer with provided contact does not exist.',
      };
    }

    const order = this.orderRepository.create({
      customer: customer,
      customerContact: customer.contact,
      soldBy: userName,
    });
    await this.orderRepository.save(order);
    return { message: 'Order successfully created.', order: order };
  }

  async addOrderItems(orderId: number, body: any): Promise<Order> {
    // Extract items array from the body
    const items = Array.isArray(body.items) ? body.items : [body];
    let totalPrice = 0;

    const order = await this.orderRepository.findOneBy({ orderId });
    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found.`);
    }

    for (const itemDto of items) {
      const product = await this.inventoryRepository.findOne({
        where: [
          { productId: itemDto.productId },
          { productName: itemDto.productName },
        ],
      });
      const price = product.productSellPrice * itemDto.quantity;
      totalPrice += price;

      const orderItem = this.orderItemRepository.create({
        orderId: order.orderId,
        productId: product.productId,
        productName: product.productName,
        quantity: itemDto.quantity,
        price,
      });

      await this.orderItemRepository.save(orderItem);
    }

    order.totalPrice += totalPrice;
    await this.orderRepository.save(order);
    return order;
  }
}
