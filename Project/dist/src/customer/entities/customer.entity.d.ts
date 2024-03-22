import { Order } from 'src/order/entities/order.entity';
export declare class Customer {
    id: number;
    name: string;
    contact: string;
    email: string;
    orders: Order[];
}
