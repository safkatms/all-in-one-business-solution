import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../order/entities/order.entity';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>, 
  ) {}

  async generateInvoiceForOrder(orderId: number): Promise<any> {
    const order = await this.orderRepository.findOne({
      where: { orderId: orderId },
      relations: ['orderItems'], 
    });

    if (!order) {
      throw new Error('Order not found');
    }

    const invoiceData = {
      orderId: order.orderId,
      customerName: order.customer, 
      items: order.orderItems.map(item => ({
        productId: item.productId,
        productName: item.productName,
        quantity: item.quantity,
        price: item.price,
      })),
      totalAmount: order.orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
    };

    return invoiceData; 
  }
}
