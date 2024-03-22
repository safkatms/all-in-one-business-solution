// src/orders/guards/check-product.guard.ts

import { Injectable, CanActivate, ExecutionContext, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InventoryManagement } from '../inventory-management/entities/inventory-management.entity';
import { OrderItem } from 'src/order/entities/order-item.entity';


@Injectable()
export class CheckProductGuard implements CanActivate {
    constructor(
        @InjectRepository(InventoryManagement)
        private readonly inventoryRepository: Repository<InventoryManagement>,
        @InjectRepository(OrderItem)
        private readonly orderItemRepository: Repository<OrderItem>,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();
        const orderId = +req.params.orderId; // Extract orderId from route parameters

        // Check if the order already has items
        const existingItemsCount = await this.orderItemRepository.count({ where: { order: { orderId: orderId } } });
        if (existingItemsCount > 0) {
            throw new BadRequestException(`Order ${orderId} already has items. No additional items can be added.`);
        }

        const items = Array.isArray(req.body.items) ? req.body.items : [req.body];
        for (const item of items) {
            console.log(`Checking item:`, item);

            if (!item.productId && !item.productName) {
                throw new BadRequestException('Product identifier not provided.');
            }

            let product = null;
            if (item.productId) {
                console.log(`Looking for product with ID: ${item.productId}`);
                product = await this.inventoryRepository.findOneBy({ productId: item.productId });
            } else if (item.productName) {
                console.log(`Looking for product with Name: ${item.productName}`);
                product = await this.inventoryRepository.findOne({ where: { productName: item.productName } });
            }

            if (!product) {
                throw new NotFoundException(`Product not found for ID: ${item.productId} or Name: "${item.productName}".`);
            }

            if (product.productQuantity < item.quantity) {
                throw new BadRequestException(`Insufficient quantity for product ID: ${item.productId} or Name: "${item.productName}". Available: ${product.productQuantity}, requested: ${item.quantity}.`);
            }
        }

        // If all checks pass, allow the request to proceed
        return true;
    }
}
