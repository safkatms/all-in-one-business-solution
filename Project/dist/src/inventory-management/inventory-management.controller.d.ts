import { InventoryManagementService } from './inventory-management.service';
import { CreateInventoryManagementDto } from './dto/create-inventory-management.dto';
import { UpdateInventoryManagementDto } from './dto/update-inventory-management.dto';
export declare class InventoryManagementController {
    private readonly inventoryManagementService;
    constructor(inventoryManagementService: InventoryManagementService);
    create(createInventoryManagementDto: CreateInventoryManagementDto): Promise<{
        message: string;
        product: import("./entities/inventory-management.entity").InventoryManagement;
    }>;
    findAll(): Promise<import("./entities/inventory-management.entity").InventoryManagement[]>;
    findByUsername(itemName: string): Promise<import("./entities/inventory-management.entity").InventoryManagement>;
    findOne(id: string): Promise<import("./entities/inventory-management.entity").InventoryManagement>;
    update(id: number, updateInventoryManagementDto: UpdateInventoryManagementDto): Promise<{
        message: string;
        product: import("./entities/inventory-management.entity").InventoryManagement;
    }>;
    remove(id: string): Promise<{
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
}
