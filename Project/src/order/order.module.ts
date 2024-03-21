import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { InventoryManagement } from 'src/inventory-management/entities/inventory-management.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderItem, InventoryManagement]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
