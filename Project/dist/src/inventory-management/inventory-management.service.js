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
exports.InventoryManagementService = void 0;
const common_1 = require("@nestjs/common");
const inventory_management_entity_1 = require("./entities/inventory-management.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
let InventoryManagementService = class InventoryManagementService {
    constructor(inventoryRepo) {
        this.inventoryRepo = inventoryRepo;
    }
    async create(createInventoryManagementDto) {
        const invetoryItem = await this.inventoryRepo.create(createInventoryManagementDto);
        return await this.inventoryRepo.save(invetoryItem);
    }
    async findAll() {
        return await this.inventoryRepo.find();
    }
    async findOne(id) {
        return await this.inventoryRepo.findOne({ where: { productId: id } });
    }
    async update(id, updateInventoryDto) {
        const updatenew = new inventory_management_entity_1.InventoryManagement();
        updatenew.productName = updateInventoryDto.productName;
        updatenew.productDetails = updateInventoryDto.productDetails;
        updatenew.productPurchasePrice = updateInventoryDto.productPurchasePrice;
        updatenew.productSellPrice = updateInventoryDto.productSellPrice;
        updatenew.porductBrand = updateInventoryDto.porductBrand;
        updatenew.productQuantity = updateInventoryDto.productQuantity;
        updatenew.productId = id;
        return await this.inventoryRepo.save(updatenew);
    }
    async remove(id) {
        return await this.inventoryRepo.delete(id);
    }
    async findByItemName(itemName) {
        return await this.inventoryRepo.findOne({
            where: { productName: itemName },
        });
    }
    async removebyItemName(itemName) {
        return await this.inventoryRepo.delete(itemName);
    }
};
exports.InventoryManagementService = InventoryManagementService;
exports.InventoryManagementService = InventoryManagementService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(inventory_management_entity_1.InventoryManagement)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], InventoryManagementService);
//# sourceMappingURL=inventory-management.service.js.map