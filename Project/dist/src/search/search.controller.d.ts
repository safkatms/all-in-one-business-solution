import { SearchService } from './search.service';
import { FindProductDto } from 'src/inventory-management/dto/find-product.dto';
import { FindPurchaseDto } from 'src/purchase-management/dto/find-purchase.dto';
export declare class SearchController {
    private readonly searchService;
    constructor(searchService: SearchService);
    findOne(qry: FindProductDto | FindPurchaseDto): Promise<import("src/inventory-management/entities/inventory-management.entity").InventoryManagement[] | import("src/purchase-management/entities/purchase-management.entity").PurchaseManagement[]>;
}
