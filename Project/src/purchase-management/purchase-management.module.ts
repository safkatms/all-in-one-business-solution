import { MiddlewareConsumer, Module } from '@nestjs/common';
import { PurchaseManagementService } from './purchase-management.service';
import { PurchaseManagementController } from './purchase-management.controller';
import { PurchaseManagement } from './entities/purchase-management.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseValidationMiddleware } from './middleware/middleware.middleware';

@Module({
  controllers: [PurchaseManagementController],
  providers: [PurchaseManagementService],
  imports: [TypeOrmModule.forFeature([PurchaseManagement])],
  exports: [PurchaseManagementService],
})
export class PurchaseManagementModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(PurchaseValidationMiddleware)
      .forRoutes('purchase-management');
  }
}
