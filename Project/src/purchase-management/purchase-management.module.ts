import { Module } from '@nestjs/common';
import { PurchaseManagementService } from './purchase-management.service';
import { PurchaseManagementController } from './purchase-management.controller';
import { PurchaseManagement } from './entities/purchase-management.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [PurchaseManagementController],
  providers: [PurchaseManagementService],
  imports: [TypeOrmModule.forFeature([PurchaseManagement])],
  exports: [PurchaseManagementService],
})
export class PurchaseManagementModule {}
