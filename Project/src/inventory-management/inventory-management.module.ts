import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
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
      .exclude({ path: 'inventory-management', method: RequestMethod.GET })
      .forRoutes(
        { path: 'inventory-management/add-item', method: RequestMethod.POST },
        {
          path: 'inventory-management/modify-item/:id',
          method: RequestMethod.PATCH,
        },
      );
  }
}
