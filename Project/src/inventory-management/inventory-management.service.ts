import { Injectable } from '@nestjs/common';
import { CreateInventoryManagementDto } from './dto/create-inventory-management.dto';
import { UpdateInventoryManagementDto } from './dto/update-inventory-management.dto';
import { InventoryManagement } from './entities/inventory-management.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
//import { NotificationService } from 'src/notification/notification.service';

@Injectable()
export class InventoryManagementService {
  constructor(
    @InjectRepository(InventoryManagement)
    private readonly inventoryRepo: Repository<InventoryManagement>,
  ) {}

  //adding item to the db
  async create(createInventoryManagementDto: CreateInventoryManagementDto) {
    const invetoryItem = await this.inventoryRepo.create(
      createInventoryManagementDto,
    );

    return await this.inventoryRepo.save(invetoryItem);
  }
  //return all inventory data
  async findAll() {
    return await this.inventoryRepo.find();
  }
  //find the particular
  async findOne(id: number) {
    return await this.inventoryRepo.findOne({ where: { productId: id } });
  }
  //update inventory item using id
  async update(id: number, updateInventoryDto: UpdateInventoryManagementDto) {
    const updatenew: InventoryManagement = new InventoryManagement();
    updatenew.productName = updateInventoryDto.productName;
    updatenew.productDetails = updateInventoryDto.productDetails;
    updatenew.productPurchasePrice = updateInventoryDto.productPurchasePrice;
    updatenew.productSellPrice = updateInventoryDto.productSellPrice;
    updatenew.porductBrand = updateInventoryDto.productBrand;
    updatenew.productQuantity = updateInventoryDto.productQuantity;
    updatenew.productId = id;

    return await this.inventoryRepo.save(updatenew);
  }
  //remove by id
  async remove(id: number) {
    return await this.inventoryRepo.delete(id);
  }
  //find by item name
  async findByItemName(itemName: string) {
    return await this.inventoryRepo.findOne({
      where: { productName: itemName },
    });
  }
  //remove by itemName
  async removebyItemName(itemName: string) {
    return await this.inventoryRepo.delete(itemName);
  }
}
