import { CreatePurchaseManagementDto } from './dto/create-purchase-management.dto';
import { UpdatePurchaseManagementDto } from './dto/update-purchase-management.dto';
import { PurchaseManagement } from './entities/purchase-management.entity';
import { Repository } from 'typeorm';
export declare class PurchaseManagementService {
    private readonly purchaseRepo;
    constructor(purchaseRepo: Repository<PurchaseManagement>);
    insertPurchase(createPurchaseManagementDto: CreatePurchaseManagementDto): Promise<PurchaseManagement>;
    findAllPurchaseDetails(): Promise<PurchaseManagement[]>;
    findPurchaseById(id: number): Promise<PurchaseManagement>;
    modifyPurchaseInfo(id: number, updatePurchaseManagementDto: UpdatePurchaseManagementDto): Promise<PurchaseManagement>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
