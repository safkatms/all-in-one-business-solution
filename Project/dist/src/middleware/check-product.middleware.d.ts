import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InventoryManagement } from '../inventory-management/entities/inventory-management.entity';
import { OrderItem } from 'src/order/entities/order-item.entity';
export declare class CheckProductGuard implements CanActivate {
    private readonly inventoryRepository;
    private readonly orderItemRepository;
    constructor(inventoryRepository: Repository<InventoryManagement>, orderItemRepository: Repository<OrderItem>);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
