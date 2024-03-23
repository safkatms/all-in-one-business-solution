import { CreatePurchaseManagementDto } from './dto/create-purchase-management.dto';
import { UpdatePurchaseManagementDto } from './dto/update-purchase-management.dto';
import { PurchaseManagement } from './entities/purchase-management.entity';
import { Repository } from 'typeorm';
export declare class PurchaseManagementService {
    private readonly purchaseRepo;
    constructor(purchaseRepo: Repository<PurchaseManagement>);
    insertPurchase(createPurchaseManagementDto: CreatePurchaseManagementDto): Promise<{
        message: string;
        purchase: PurchaseManagement;
    } | {
        message: string;
        purchase?: undefined;
    }>;
    findAllPurchaseDetails(): Promise<PurchaseManagement[]>;
    findPurchaseById(id: number): Promise<PurchaseManagement>;
    modifyPurchaseInfo(id: number, updatePurchaseManagementDto: UpdatePurchaseManagementDto): Promise<{
        message: string;
        product: PurchaseManagement;
    }>;
    remove(id: number): Promise<{
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
