import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { InventoryManagement } from 'src/inventory-management/entities/inventory-management.entity';
import { CheckProductMiddleware } from 'src/middleware/check-product.middleware';
import { Customer } from 'src/customer/entities/customer.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderItem, InventoryManagement, Customer]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})

export class OrderModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckProductMiddleware)
      .forRoutes({ path: 'order/:id/items', method: RequestMethod.POST });
  }
}
