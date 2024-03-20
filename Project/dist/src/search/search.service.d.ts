import { FindProductDto } from 'src/inventory-management/dto/find-product.dto';
import { InventoryManagement } from 'src/inventory-management/entities/inventory-management.entity';
import { FindPurchaseDto } from 'src/purchase-management/dto/find-purchase.dto';
import { PurchaseManagement } from 'src/purchase-management/entities/purchase-management.entity';
import { Repository } from 'typeorm';
export declare class SearchService {
    private readonly inventoryRepo;
    private readonly purchaseRepo;
    constructor(inventoryRepo: Repository<InventoryManagement>, purchaseRepo: Repository<PurchaseManagement>);
    findAny(dto: FindProductDto | FindPurchaseDto): Promise<InventoryManagement[] | PurchaseManagement[]>;
}
