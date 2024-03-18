import { InventoryManagementService } from './inventory-management.service';
import { CreateInventoryManagementDto } from './dto/create-inventory-management.dto';
import { UpdateInventoryManagementDto } from './dto/update-inventory-management.dto';
export declare class InventoryManagementController {
    private readonly inventoryManagementService;
    constructor(inventoryManagementService: InventoryManagementService);
    create(createInventoryManagementDto: CreateInventoryManagementDto): Promise<import("src/inventory-management/entities/inventory-management.entity").InventoryManagement>;
    findAll(): Promise<import("src/inventory-management/entities/inventory-management.entity").InventoryManagement[]>;
    findByUsername(itemName: string): Promise<import("src/inventory-management/entities/inventory-management.entity").InventoryManagement>;
    findOne(id: string): Promise<import("src/inventory-management/entities/inventory-management.entity").InventoryManagement>;
    update(id: number, updateInventoryManagementDto: UpdateInventoryManagementDto): Promise<import("src/inventory-management/entities/inventory-management.entity").InventoryManagement>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
