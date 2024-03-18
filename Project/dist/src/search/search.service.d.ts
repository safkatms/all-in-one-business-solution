import { FindProductDto } from 'src/inventory-management/dto/find-product.dto';
import { InventoryManagement } from 'src/inventory-management/entities/inventory-management.entity';
import { Repository } from 'typeorm';
export declare class SearchService {
    private readonly inventoryRepo;
    constructor(inventoryRepo: Repository<InventoryManagement>);
    findAny(dto: FindProductDto): Promise<InventoryManagement[]>;
}
