import { Module } from '@nestjs/common';
import { InventoryManagementService } from './inventory-management.service';
import { InventoryManagementController } from './inventory-management.controller';
import { InventoryManagement } from './entities/inventory-management.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [InventoryManagementController],
  providers: [InventoryManagementService],
  imports: [TypeOrmModule.forFeature([InventoryManagement])],
  exports: [InventoryManagementService],
})
export class InventoryManagementModule {}
