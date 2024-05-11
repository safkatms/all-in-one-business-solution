import { PurchaseManagementService } from './purchase-management.service';
import { CreatePurchaseManagementDto } from './dto/create-purchase-management.dto';
import { UpdatePurchaseManagementDto } from './dto/update-purchase-management.dto';
export declare class PurchaseManagementController {
    private readonly purchaseManagementService;
    constructor(purchaseManagementService: PurchaseManagementService);
    create(createPurchaseManagementDto: CreatePurchaseManagementDto): Promise<{
        message: string;
        purchase: import("./entities/purchase-management.entity").PurchaseManagement;
    } | {
        message: string;
        purchase?: undefined;
    }>;
    findAll(): Promise<import("./entities/purchase-management.entity").PurchaseManagement[]>;
    findOne(id: string): Promise<import("./entities/purchase-management.entity").PurchaseManagement>;
    update(id: string, updatePurchaseManagementDto: UpdatePurchaseManagementDto): Promise<{
        message: string;
        product: import("./entities/purchase-management.entity").PurchaseManagement;
    }>;
    remove(id: string): Promise<{
        message: string;
        deletedPurchase: {
            purchaseId: number;
            vendorName: string;
            vendorContact: string;
            vendorEmail: string;
            productName: string;
            productQuantity: number;
            productPurchasePrice: number;
            purchaseTotalPrice: number;
            purchaseDate: string;
        };
    }>;
}
