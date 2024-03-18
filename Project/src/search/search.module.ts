import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { InventoryManagement } from 'src/inventory-management/entities/inventory-management.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [SearchController],
  providers: [SearchService],
  imports: [TypeOrmModule.forFeature([InventoryManagement])],
})
export class SearchModule {}
