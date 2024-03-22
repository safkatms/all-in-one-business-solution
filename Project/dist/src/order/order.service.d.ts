import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { InventoryManagement } from '../inventory-management/entities/inventory-management.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { AddOrderItemDto } from './dto/add-order-item.dto';
export declare class OrderService {
    private readonly orderRepository;
    private readonly orderItemRepository;
    private readonly inventoryRepository;
    constructor(orderRepository: Repository<Order>, orderItemRepository: Repository<OrderItem>, inventoryRepository: Repository<InventoryManagement>);
    createOrder(createOrderDto: CreateOrderDto): Promise<Order>;
    addOrderItem(orderId: number, addOrderItemDto: AddOrderItemDto): Promise<OrderItem>;
    addMultipleOrderItems(orderId: number, itemsDto: AddOrderItemDto[]): Promise<OrderItem[]>;
}
