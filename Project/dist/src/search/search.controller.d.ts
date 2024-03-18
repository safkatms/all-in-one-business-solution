import { SearchService } from './search.service';
import { FindProductDto } from 'src/inventory-management/dto/find-product.dto';
export declare class SearchController {
    private readonly searchService;
    constructor(searchService: SearchService);
    findOne(qry: FindProductDto): Promise<import("src/inventory-management/entities/inventory-management.entity").InventoryManagement[]>;
}
