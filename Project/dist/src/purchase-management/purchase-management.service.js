"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseManagementService = void 0;
const common_1 = require("@nestjs/common");
const purchase_management_entity_1 = require("./entities/purchase-management.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let PurchaseManagementService = class PurchaseManagementService {
    constructor(purchaseRepo) {
        this.purchaseRepo = purchaseRepo;
    }
    async insertPurchase(createPurchaseManagementDto) {
        try {
            const purchaseItem = await this.purchaseRepo.create(createPurchaseManagementDto);
            const insertedPurchase = await this.purchaseRepo.save(purchaseItem);
            return {
                message: 'Purchase inserted successfully',
                purchase: insertedPurchase,
            };
        }
        catch (error) {
            return { message: 'Failed to insert purchase' };
        }
    }
    async findAllPurchaseDetails() {
        return await this.purchaseRepo.find();
    }
    async findPurchaseById(id) {
        const purchaseCheck = await this.purchaseRepo.findOne({
            where: { purchaseId: id },
        });
        if (!purchaseCheck) {
            throw new common_1.NotFoundException(`Purchase with ID ${id} not found`);
        }
        return purchaseCheck;
    }
    async modifyPurchaseInfo(id, updatePurchaseManagementDto) {
        const existingPurchase = await this.purchaseRepo.findOne({
            where: { purchaseId: id },
        });
        if (!existingPurchase) {
            throw new common_1.NotFoundException(`Purchase with ID ${id} not found`);
        }
        Object.assign(existingPurchase, updatePurchaseManagementDto);
        await this.purchaseRepo.save(existingPurchase);
        const updatedPurchase = await this.purchaseRepo.findOne({
            where: { purchaseId: id },
        });
        return {
            message: 'Update successful',
            product: updatedPurchase,
        };
    }
    async remove(id) {
        const existingPurchase = await this.purchaseRepo.findOne({
            where: { purchaseId: id },
        });
        if (!existingPurchase) {
            throw new common_1.NotFoundException(`Purchase with ID ${id} not found`);
        }
        const deletedPurchase = { ...existingPurchase };
        await this.purchaseRepo.delete(id);
        return {
            message: `Purchase with ID ${id} has been successfully deleted`,
            deletedPurchase,
        };
    }
};
exports.PurchaseManagementService = PurchaseManagementService;
exports.PurchaseManagementService = PurchaseManagementService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(purchase_management_entity_1.PurchaseManagement)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PurchaseManagementService);
//# sourceMappingURL=purchase-management.service.js.map