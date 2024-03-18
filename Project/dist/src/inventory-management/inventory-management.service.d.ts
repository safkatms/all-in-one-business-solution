import { CreateInventoryManagementDto } from './dto/create-inventory-management.dto';
import { UpdateInventoryManagementDto } from './dto/update-inventory-management.dto';
import { InventoryManagement } from './entities/inventory-management.entity';
import { Repository } from 'typeorm';
export declare class InventoryManagementService {
    private readonly inventoryRepo;
    constructor(inventoryRepo: Repository<InventoryManagement>);
    create(createInventoryManagementDto: CreateInventoryManagementDto): Promise<InventoryManagement>;
    findAll(): Promise<InventoryManagement[]>;
    findOne(id: number): Promise<InventoryManagement>;
    update(id: number, updateInventoryDto: UpdateInventoryManagementDto): Promise<InventoryManagement>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
    findByItemName(itemName: string): Promise<InventoryManagement>;
    removebyItemName(itemName: string): Promise<import("typeorm").DeleteResult>;
}
