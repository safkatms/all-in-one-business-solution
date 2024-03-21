// src/orders/orders.service.ts

import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { InventoryManagement } from '../inventory-management/entities/inventory-management.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { AddOrderItemDto } from './dto/add-order-item.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
    @InjectRepository(InventoryManagement)
    private readonly inventoryRepository: Repository<InventoryManagement>,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const order = this.orderRepository.create(createOrderDto);
    await this.orderRepository.save(order);
    return order;
  }

  async addOrderItem(orderId: number, addOrderItemDto: AddOrderItemDto): Promise<OrderItem> {
    const order = await this.orderRepository.findOneBy({ orderId });
    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found.`);
    }

    let product;
    if (addOrderItemDto.productId) {
      product = await this.inventoryRepository.findOneBy({ productId: addOrderItemDto.productId });
    } else {
      product = await this.inventoryRepository.findOneBy({ productName: addOrderItemDto.productName });
    }

    if (!product) {
      throw new NotFoundException('Product not found.');
    }

    if (product.productQuantity < addOrderItemDto.quantity) {
      throw new BadRequestException('Not enough product quantity available.');
    }

    // Update product quantity
    product.productQuantity -= addOrderItemDto.quantity;
    await this.inventoryRepository.save(product);

    // Create and save the order item
    const orderItem = this.orderItemRepository.create({
      orderId,
      productId: product.productId,
      productName: product.productName,
      quantity: addOrderItemDto.quantity,
      price: product.productSellPrice * addOrderItemDto.quantity,
    });
    await this.orderItemRepository.save(orderItem);

    return orderItem;
  }

  // Method to handle adding multiple items if needed
  async addMultipleOrderItems(orderId: number, itemsDto: AddOrderItemDto[]): Promise<OrderItem[]> {
    const orderItems = [];
    for (const itemDto of itemsDto) {
      const orderItem = await this.addOrderItem(orderId, itemDto);
      orderItems.push(orderItem);
    }
    return orderItems;
  }
}
