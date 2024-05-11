import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { AddOrderItemDto } from './dto/add-order-item.dto';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    createOrder(createOrderDto: CreateOrderDto, req: any): Promise<any>;
    addOrderItems(orderId: number, itemsDto: AddOrderItemDto[]): Promise<import("src/order/entities/order.entity").Order>;
}
