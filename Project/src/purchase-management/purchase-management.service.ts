import { Injectable, NotFoundException } from '@nestjs/common';
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
    try {
      const purchaseItem = await this.purchaseRepo.create(
        createPurchaseManagementDto,
      );
      const insertedPurchase = await this.purchaseRepo.save(purchaseItem);
      return {
        message: 'Purchase inserted successfully',
        purchase: insertedPurchase,
      };
    } catch (error) {
      return { message: 'Failed to insert purchase' };
    }
  }

  //fetch all purchase from db
  async findAllPurchaseDetails() {
    return await this.purchaseRepo.find();
  }

  async findPurchaseById(id: number) {
    const purchaseCheck = await this.purchaseRepo.findOne({
      where: { purchaseId: id },
    });
    if (!purchaseCheck) {
      throw new NotFoundException(`Purchase with ID ${id} not found`);
    }
    return purchaseCheck;
  }

  //modify
  async modifyPurchaseInfo(
    id: number,
    updatePurchaseManagementDto: UpdatePurchaseManagementDto,
  ) {
    //check value in the db
    const existingPurchase = await this.purchaseRepo.findOne({
      where: { purchaseId: id },
    });
    if (!existingPurchase) {
      throw new NotFoundException(`Purchase with ID ${id} not found`);
    }

    Object.assign(existingPurchase, updatePurchaseManagementDto);

    await this.purchaseRepo.save(existingPurchase);

    //retriveing updated product info
    const updatedPurchase = await this.purchaseRepo.findOne({
      where: { purchaseId: id },
    });

    return {
      message: 'Update successful',
      product: updatedPurchase,
    };
  }
  //find and remove
  async remove(id: number) {
    const existingPurchase = await this.purchaseRepo.findOne({
      where: { purchaseId: id },
    });
    if (!existingPurchase) {
      throw new NotFoundException(`Purchase with ID ${id} not found`);
    }
    const deletedPurchase = { ...existingPurchase };

    await this.purchaseRepo.delete(id);
    return {
      message: `Purchase with ID ${id} has been successfully deleted`,
      deletedPurchase,
    };
  }
}
