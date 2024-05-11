import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { InventoryManagement } from 'src/inventory-management/entities/inventory-management.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseManagement } from 'src/purchase-management/entities/purchase-management.entity';

@Module({
  controllers: [SearchController],
  providers: [SearchService],
  imports: [
    TypeOrmModule.forFeature([InventoryManagement, PurchaseManagement]),
  ],
})
export class SearchModule {}
