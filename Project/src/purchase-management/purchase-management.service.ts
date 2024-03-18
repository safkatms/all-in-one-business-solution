import { Injectable } from '@nestjs/common';
import { CreatePurchaseManagementDto } from './dto/create-purchase-management.dto';
import { UpdatePurchaseManagementDto } from './dto/update-purchase-management.dto';
import { PurchaseManagement } from './entities/purchase-management.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PurchaseManagementService {
  constructor(
    @InjectRepository(PurchaseManagement)
    private readonly purchaseRepo: Repository<PurchaseManagement>,
  ) {}
  //add purchase details
  async insertPurchase(
    createPurchaseManagementDto: CreatePurchaseManagementDto,
  ) {
    const invetoryItem = await this.purchaseRepo.create(
      createPurchaseManagementDto,
    );
    return await this.purchaseRepo.save(invetoryItem);
  }

  //fetch all purchase from db
  async findAllPurchaseDetails() {
    return await this.purchaseRepo.find();
  }

  async findPurchaseById(id: number) {
    return await this.purchaseRepo.findOne({ where: { purchaseId: id } });
  }

  //modify
  async modifyPurchaseInfo(
    id: number,
    updatePurchaseManagementDto: UpdatePurchaseManagementDto,
  ) {
    const updatenew: PurchaseManagement = new PurchaseManagement();
    updatenew.vendorName = updatePurchaseManagementDto.vendorName;
    updatenew.vendorContact = updatePurchaseManagementDto.vendorContact;
    updatenew.vendorEmail = updatePurchaseManagementDto.vendorEmail;
    updatenew.productName = updatePurchaseManagementDto.productName;
    updatenew.productQuantity = updatePurchaseManagementDto.productQuantity;
    updatenew.productPurchasePrice =
      updatePurchaseManagementDto.productPurchasePrice;
    updatenew.purchaseTotalPrice =
      updatePurchaseManagementDto.productPurchasePrice;
    updatenew.purchaseDate = updatePurchaseManagementDto.purchaseDate;

    updatenew.purchaseId = id;

    return await this.purchaseRepo.save(updatenew);
  }

  async remove(id: number) {
    return await this.purchaseRepo.delete(id);
  }
}
