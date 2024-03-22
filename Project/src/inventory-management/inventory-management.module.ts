import { MiddlewareConsumer, Module } from '@nestjs/common';
import { InventoryManagementService } from './inventory-management.service';
import { InventoryManagementController } from './inventory-management.controller';
import { InventoryManagement } from './entities/inventory-management.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryValidationMiddleware } from './middleware/middleware.middleware';

@Module({
  controllers: [InventoryManagementController],
  providers: [InventoryManagementService],
  imports: [TypeOrmModule.forFeature([InventoryManagement])],
  exports: [InventoryManagementService],
})
export class InventoryManagementModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(InventoryValidationMiddleware)
      .forRoutes('inventory-management');
  }
}
