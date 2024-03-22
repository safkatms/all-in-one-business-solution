import { OrderItem } from './order-item.entity';
export declare class Order {
    orderId: number;
    customerId: number;
    orderItems: OrderItem[];
}
