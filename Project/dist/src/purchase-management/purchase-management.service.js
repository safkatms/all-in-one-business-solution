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
        const invetoryItem = await this.purchaseRepo.create(createPurchaseManagementDto);
        return await this.purchaseRepo.save(invetoryItem);
    }
    async findAllPurchaseDetails() {
        return await this.purchaseRepo.find();
    }
    async findPurchaseById(id) {
        return await this.purchaseRepo.findOne({ where: { purchaseId: id } });
    }
    async modifyPurchaseInfo(id, updatePurchaseManagementDto) {
        const updatenew = new purchase_management_entity_1.PurchaseManagement();
        updatenew.vendorName = updatePurchaseManagementDto.vendorName;
        updatenew.vendorContact = updatePurchaseManagementDto.vendorContact;
        updatenew.vendorEmail = updatePurchaseManagementDto.vendorEmail;
        updatenew.productName = updatePurchaseManagementDto.productName;
        updatenew.productQuantity = updatePurchaseManagementDto.productQuantity;
        updatenew.productPurchasePrice =
            updatePurchaseManagementDto.productPurchasePrice;
        updatenew.purchaseTotalPrice =
            updatePurchaseManagementDto.productPurchasePrice;
        updatenew.purchaseDate = updatePurchaseManagementDto.purchaseDate;
        updatenew.purchaseId = id;
        return await this.purchaseRepo.save(updatenew);
    }
    async remove(id) {
        return await this.purchaseRepo.delete(id);
    }
};
exports.PurchaseManagementService = PurchaseManagementService;
exports.PurchaseManagementService = PurchaseManagementService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(purchase_management_entity_1.PurchaseManagement)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PurchaseManagementService);
//# sourceMappingURL=purchase-management.service.js.map