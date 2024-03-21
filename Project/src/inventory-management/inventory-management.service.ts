import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  // Check if a product already exists
  async checkProductExists(productName: string): Promise<void> {
    const existingProduct = await this.inventoryRepo.findOne({
      where: { productName },
    });
    if (existingProduct) {
      throw new ConflictException(`Product ${productName} already exists`);
    }
  }

  //adding item to the db
  async create(createInventoryManagementDto: CreateInventoryManagementDto) {
    const { productName } = createInventoryManagementDto;
    // Check if the product already exists
    await this.checkProductExists(productName);

    //else creating product
    const invetoryItem = await this.inventoryRepo.create(
      createInventoryManagementDto,
    );

    await this.inventoryRepo.save(invetoryItem);

    //retriving the created product
    const createdProduct = await this.inventoryRepo.findOne({
      where: { productName },
    });
    return {
      message: 'Product created successfully',
      product: createdProduct,
    };
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
    //check produt availablity
    const existingProduct = await this.inventoryRepo.findOne({
      where: { productId: id },
    });
    if (!existingProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    //check exits product// duplicacy handle
    if (
      updateInventoryDto.productName &&
      updateInventoryDto.productName !== existingProduct.productName
    ) {
      await this.checkProductExists(updateInventoryDto.productName);
    }
    //else
    Object.assign(existingProduct, updateInventoryDto);

    await this.inventoryRepo.save(existingProduct);
    //retriveing updated product info
    const updatedProduct = await this.inventoryRepo.findOne({
      where: { productId: id },
    });

    return {
      message: 'Update successful',
      product: updatedProduct,
    };
  }
  //remove by id
  async remove(id: number) {
    //check produt availablity
    const existingProduct = await this.inventoryRepo.findOne({
      where: { productId: id },
    });
    if (!existingProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    } else {
      const deletedProduct = { ...existingProduct };

      await this.inventoryRepo.delete(id);

      return {
        message: `Product with ID ${id} has been successfully deleted`,
        deletedProduct,
      };
    }
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
