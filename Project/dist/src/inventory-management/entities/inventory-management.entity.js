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
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryManagement = void 0;
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
let InventoryManagement = class InventoryManagement {
};
exports.InventoryManagement = InventoryManagement;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID of the product', example: 1 }),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], InventoryManagement.prototype, "productId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Name of the product', example: 'Product Name' }),
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], InventoryManagement.prototype, "productName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Details of the product',
        example: 'Product Details',
    }),
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], InventoryManagement.prototype, "productDetails", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Purchase price of the product', example: 10.5 }),
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Number)
], InventoryManagement.prototype, "productPurchasePrice", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Sell price of the product', example: 15.0 }),
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Number)
], InventoryManagement.prototype, "productSellPrice", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Brand of the product', example: 'Brand Name' }),
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], InventoryManagement.prototype, "porductBrand", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Quantity of the product', example: 100 }),
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Number)
], InventoryManagement.prototype, "productQuantity", void 0);
exports.InventoryManagement = InventoryManagement = __decorate([
    (0, typeorm_1.Entity)('productInfo')
], InventoryManagement);
//# sourceMappingURL=inventory-management.entity.js.map