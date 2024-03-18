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
exports.SearchService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const inventory_management_entity_1 = require("../inventory-management/entities/inventory-management.entity");
const typeorm_2 = require("typeorm");
let SearchService = class SearchService {
    constructor(inventoryRepo) {
        this.inventoryRepo = inventoryRepo;
    }
    async findAny(dto) {
        const { productName, productDetails, porductBrand, productPurchasePrice, productSellPrice, productQuantity, } = dto;
        const conditions = {
            ...(productName ? { productName } : {}),
            ...(productDetails ? { productDetails } : {}),
            ...(porductBrand ? { porductBrand } : {}),
            ...(productPurchasePrice ? { productPurchasePrice } : {}),
            ...(productSellPrice ? { productSellPrice } : {}),
            ...(productQuantity ? { productQuantity } : {}),
        };
        return await this.inventoryRepo.find({ where: conditions });
    }
};
exports.SearchService = SearchService;
exports.SearchService = SearchService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(inventory_management_entity_1.InventoryManagement)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SearchService);
//# sourceMappingURL=search.service.js.map