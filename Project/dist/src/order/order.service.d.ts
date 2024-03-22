import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { InventoryManagement } from 'src/inventory-management/entities/inventory-management.entity';
import { Customer } from 'src/customer/entities/customer.entity';
export declare class OrderService {
    private orderRepository;
    private orderItemRepository;
    private readonly inventoryRepository;
    private readonly customerRepository;
    constructor(orderRepository: Repository<Order>, orderItemRepository: Repository<OrderItem>, inventoryRepository: Repository<InventoryManagement>, customerRepository: Repository<Customer>);
    createOrder(userName: string, createOrderDto: CreateOrderDto): Promise<any>;
    addOrderItems(orderId: number, body: any): Promise<Order>;
}
