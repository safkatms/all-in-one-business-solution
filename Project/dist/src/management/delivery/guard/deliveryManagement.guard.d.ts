import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Order } from 'src/order/entities/order.entity';
export declare class DeliveryManagementValidIdGuard implements CanActivate {
    private readonly orderRepository;
    constructor(orderRepository: Repository<Order>);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
