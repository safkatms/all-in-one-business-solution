// src/invoices/invoice.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../order/entities/order.entity';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>, // Inject the OrderRepository
  ) {}

  async generateInvoiceForOrder(orderId: number): Promise<any> {
    const order = await this.orderRepository.findOne({
      where: { orderId: orderId },
      relations: ['orderItems'], // Assuming you have orderItems relation defined in Order entity
    });

    if (!order) {
      throw new Error('Order not found');
    }

    // Here, transform the order data into an invoice format as needed
    const invoiceData = {
      orderId: order.orderId,
      customerName: order.customer, // Assuming these fields exist on the Order entity
      items: order.orderItems.map(item => ({
        productId: item.productId,
        productName: item.productName,
        quantity: item.quantity,
        price: item.price,
      })),
      totalAmount: order.orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
    };

    return invoiceData; // Return the constructed invoice data
  }
}
