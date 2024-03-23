import { Repository } from 'typeorm';
import { Order } from '../order/entities/order.entity';
export declare class InvoiceService {
    private readonly orderRepository;
    constructor(orderRepository: Repository<Order>);
    generateInvoiceForOrder(orderId: number): Promise<any>;
}
