import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindProductDto } from 'src/inventory-management/dto/find-product.dto';
import { InventoryManagement } from 'src/inventory-management/entities/inventory-management.entity';
//import { PurchaseManagement } from 'src/purchase-management/entities/purchase-management.entity';
import { FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(InventoryManagement)
    private readonly inventoryRepo: Repository<InventoryManagement>,
    //private readonly purchaseRepo: Repository<PurchaseManagement>,
  ) {}
  // async findAll() {
  //   return await this.inventoryRepo.find();
  // }

  //find through user input
  async findAny(dto: FindProductDto) {
    const {
      productName,
      productDetails,
      porductBrand,
      productPurchasePrice,
      productSellPrice,
      productQuantity,
    } = dto;

    const conditions:
      | FindOptionsWhere<InventoryManagement>
      | FindOptionsWhere<InventoryManagement> = {
      ...(productName ? { productName } : {}),
      ...(productDetails ? { productDetails } : {}),
      ...(porductBrand ? { porductBrand } : {}),
      ...(productPurchasePrice ? { productPurchasePrice } : {}),
      ...(productSellPrice ? { productSellPrice } : {}),
      ...(productQuantity ? { productQuantity } : {}),
    };
    //finding pruchase info condition 2s

    return await this.inventoryRepo.find({ where: conditions });
  }
}
