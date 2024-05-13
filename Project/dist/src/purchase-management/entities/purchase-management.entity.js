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
exports.PurchaseManagement = void 0;
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
let PurchaseManagement = class PurchaseManagement {
};
exports.PurchaseManagement = PurchaseManagement;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Unique identifier for the purchase',
        example: 1,
    }),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], PurchaseManagement.prototype, "purchaseId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Name of the vendor', example: 'Hogwartshop' }),
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], PurchaseManagement.prototype, "vendorName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Contact number of the vendor',
        example: '01734567890',
    }),
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], PurchaseManagement.prototype, "vendorContact", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Email of the vendor',
        example: 'hogwart@gmail.com',
    }),
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], PurchaseManagement.prototype, "vendorEmail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Name of the product',
        example: 'Nimbus2000',
    }),
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], PurchaseManagement.prototype, "productName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Quantity of the product purchased',
        example: 10,
    }),
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Number)
], PurchaseManagement.prototype, "productQuantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Purchase price of the product', example: 1000 }),
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Number)
], PurchaseManagement.prototype, "productPurchasePrice", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Total purchase price of the products',
        example: 1500,
    }),
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Number)
], PurchaseManagement.prototype, "purchaseTotalPrice", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Date of the purchase',
        example: '2024-03-23',
    }),
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], PurchaseManagement.prototype, "purchaseDate", void 0);
exports.PurchaseManagement = PurchaseManagement = __decorate([
    (0, typeorm_1.Entity)('purchaseInfo')
], PurchaseManagement);
//# sourceMappingURL=purchase-management.entity.js.map