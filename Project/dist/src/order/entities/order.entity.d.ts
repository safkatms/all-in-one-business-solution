import { OrderItem } from './order-item.entity';
import { Customer } from 'src/customer/entities/customer.entity';
export declare enum OrderStatus {
    Pending = "pending",
    Completed = "completed",
    Returned = "returned"
}
export declare class Order {
    orderId: number;
    customer: Customer;
    customerContact: string;
    orderItems: OrderItem[];
    totalPrice: number;
    orderStatus: OrderStatus;
}
