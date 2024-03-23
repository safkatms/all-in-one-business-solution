import { Order } from './order.entity';
export declare class OrderItem {
    orderItemId: number;
    orderId: number;
    order: Order;
    productId: number;
    productName: string;
    quantity: number;
    price: number;
}
