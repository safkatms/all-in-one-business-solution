import { Module } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { DeliveryController } from './delivery.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/order/entities/order.entity';
import { InventoryManagement } from 'src/inventory-management/entities/inventory-management.entity';
import { OrderItem } from 'src/order/entities/order-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, InventoryManagement, OrderItem])],
  controllers: [DeliveryController],
  providers: [DeliveryService],
})
export class DeliveryModule {}
