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
exports.CreatePurchaseManagementDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreatePurchaseManagementDto {
}
exports.CreatePurchaseManagementDto = CreatePurchaseManagementDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Name of the vendor',
        minLength: 4,
        example: 'Hogwartshop',
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'empty value. Vendor Name cannot be empty' }),
    (0, class_validator_1.Length)(4),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^[A-Z][a-z]*$/, {
        message: 'Vendor name must start with a capital letter and contain no numbers or special characters.',
    }),
    __metadata("design:type", String)
], CreatePurchaseManagementDto.prototype, "vendorName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Contact number of the vendor',
        minLength: 11,
        example: '01734567890',
    }),
    (0, class_validator_1.Length)(11),
    (0, class_validator_1.IsNotEmpty)({ message: 'empty value. Vendor contact cannot be empty' }),
    (0, class_validator_1.Matches)(/^01[3-9]\d{8}$/, {
        message: 'Mobile number must be a valid.',
    }),
    __metadata("design:type", String)
], CreatePurchaseManagementDto.prototype, "vendorContact", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Email of the vendor',
        example: 'hogwarts@gmail.com',
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'empty value. Email be empty' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreatePurchaseManagementDto.prototype, "vendorEmail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Name of the product',
        minLength: 4,
        example: 'Nimbus2000',
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'empty value. Product Name cannot be empty' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(4),
    __metadata("design:type", String)
], CreatePurchaseManagementDto.prototype, "productName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Quantity of the product purchased',
        example: 10,
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'empty value. Product Quantity cannot be empty' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreatePurchaseManagementDto.prototype, "productQuantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Purchase price of the product',
        example: 1000,
    }),
    (0, class_validator_1.IsNotEmpty)({
        message: 'empty value. Product Purchase price cannot be empty',
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)({ message: 'Product purchase price must be a positive number' }),
    __metadata("design:type", Number)
], CreatePurchaseManagementDto.prototype, "productPurchasePrice", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Total purchase price of the products',
        example: 1500,
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'empty value. Purchase total Price cannot be empty' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)({
        message: 'Product purchase total price must be a positive number',
    }),
    __metadata("design:type", Number)
], CreatePurchaseManagementDto.prototype, "purchaseTotalPrice", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Date of the purchase',
        example: '2024-03-23',
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'empty value. Date cannot be empty' }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreatePurchaseManagementDto.prototype, "purchaseDate", void 0);
//# sourceMappingURL=create-purchase-management.dto.js.map