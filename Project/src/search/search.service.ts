import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindProductDto } from 'src/inventory-management/dto/find-product.dto';
import { InventoryManagement } from 'src/inventory-management/entities/inventory-management.entity';
import { FindPurchaseDto } from 'src/purchase-management/dto/find-purchase.dto';
import { PurchaseManagement } from 'src/purchase-management/entities/purchase-management.entity';
import { FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(InventoryManagement)
    private readonly inventoryRepo: Repository<InventoryManagement>,
    @InjectRepository(PurchaseManagement)
    private readonly purchaseRepo: Repository<PurchaseManagement>,
  ) {}
  // async findAll() {
  //   return await this.inventoryRepo.find();
  // }

  //find through user input
  async findAny(dto: FindProductDto | FindPurchaseDto) {
    if ('productName' in dto) {
      console.log('Searching in InventoryManagement:', dto);
      const {
        productName,
        productDetails,
        porductBrand,
        productPurchasePrice,
        productSellPrice,
        productQuantity,
      } = dto as FindProductDto;

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
      return await this.inventoryRepo.find({ where: conditions });
    } else {
      console.log('Searching in PurchaseManagement:', dto);
      const { vendorName, vendorContact, vendorEmail, purchaseDate } =
        dto as FindPurchaseDto;

      const conditions: FindOptionsWhere<PurchaseManagement> = {
        ...(vendorName ? { vendorName } : {}),
        ...(vendorContact ? { vendorContact } : {}),
        ...(vendorEmail ? { vendorEmail } : {}),
        ...(purchaseDate ? { purchaseDate } : {}),
      };
      console.log('Conditions:', conditions);

      return await this.purchaseRepo.find({ where: conditions });
    }
  }
}
