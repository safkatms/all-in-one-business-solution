import { Order } from '../../order/entities/order.entity';
export declare class Invoice {
    id: number;
    totalAmount: number;
    order: Order;
}
