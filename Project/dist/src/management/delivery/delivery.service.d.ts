import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { Repository } from 'typeorm';
import { Order } from 'src/order/entities/order.entity';
import { InventoryManagement } from 'src/inventory-management/entities/inventory-management.entity';
import { OrderItem } from 'src/order/entities/order-item.entity';
export declare class DeliveryService {
    private readonly orderRepository;
    private readonly inventoryRepository;
    private readonly orderItemRepository;
    constructor(orderRepository: Repository<Order>, inventoryRepository: Repository<InventoryManagement>, orderItemRepository: Repository<OrderItem>);
    makeDelivery(id: number, updateDeliveryDto: UpdateDeliveryDto): Promise<string>;
    findAll(): string;
    findOne(id: number): Promise<void>;
    returnedDelivery(id: number, updateDeliveryDto: UpdateDeliveryDto): Promise<string>;
}
