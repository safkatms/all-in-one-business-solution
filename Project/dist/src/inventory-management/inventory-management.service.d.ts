import { CreateInventoryManagementDto } from './dto/create-inventory-management.dto';
import { UpdateInventoryManagementDto } from './dto/update-inventory-management.dto';
import { InventoryManagement } from './entities/inventory-management.entity';
import { Repository } from 'typeorm';
export declare class InventoryManagementService {
    private readonly inventoryRepo;
    constructor(inventoryRepo: Repository<InventoryManagement>);
    checkProductExists(productName: string): Promise<void>;
    create(createInventoryManagementDto: CreateInventoryManagementDto): Promise<{
        message: string;
        product: InventoryManagement;
    }>;
    findAll(): Promise<InventoryManagement[]>;
    findOne(id: number): Promise<InventoryManagement>;
    update(id: number, updateInventoryDto: UpdateInventoryManagementDto): Promise<{
        message: string;
        product: InventoryManagement;
    }>;
    remove(id: number): Promise<{
        message: string;
        deletedProduct: {
            productId: number;
            productName: string;
            productDetails: string;
            productPurchasePrice: number;
            productSellPrice: number;
            porductBrand: string;
            productQuantity: number;
        };
    }>;
    findByItemName(itemName: string): Promise<InventoryManagement>;
    removebyItemName(itemName: string): Promise<import("typeorm").DeleteResult>;
}
