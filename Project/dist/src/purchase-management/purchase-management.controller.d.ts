import { PurchaseManagementService } from './purchase-management.service';
import { CreatePurchaseManagementDto } from './dto/create-purchase-management.dto';
import { UpdatePurchaseManagementDto } from './dto/update-purchase-management.dto';
export declare class PurchaseManagementController {
    private readonly purchaseManagementService;
    constructor(purchaseManagementService: PurchaseManagementService);
    create(createPurchaseManagementDto: CreatePurchaseManagementDto): Promise<import("src/purchase-management/entities/purchase-management.entity").PurchaseManagement>;
    findAll(): Promise<import("src/purchase-management/entities/purchase-management.entity").PurchaseManagement[]>;
    findOne(id: string): Promise<import("src/purchase-management/entities/purchase-management.entity").PurchaseManagement>;
    update(id: string, updatePurchaseManagementDto: UpdatePurchaseManagementDto): Promise<import("src/purchase-management/entities/purchase-management.entity").PurchaseManagement>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
