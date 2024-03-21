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
exports.CreateInventoryManagementDto = void 0;
const class_validator_1 = require("class-validator");
class CreateInventoryManagementDto {
}
exports.CreateInventoryManagementDto = CreateInventoryManagementDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Product name cannot be empty' }),
    (0, class_validator_1.IsString)({ message: 'Product name must be a string' }),
    (0, class_validator_1.Length)(2, 50, {
        message: 'Product name must be between 2 and 50 characters',
    }),
    (0, class_validator_1.Matches)(/^[A-Z][a-zA-Z0-9]*$/, {
        message: 'Product name must start with a capital letter and no special characters.',
    }),
    __metadata("design:type", String)
], CreateInventoryManagementDto.prototype, "productName", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Product details cannot be empty' }),
    (0, class_validator_1.IsString)({ message: 'Product details must be a string' }),
    (0, class_validator_1.Length)(2, 255, {
        message: 'Product details must be between 2 and 255 characters',
    }),
    __metadata("design:type", String)
], CreateInventoryManagementDto.prototype, "productDetails", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Product purchase price cannot be empty' }),
    (0, class_validator_1.IsNumber)({}, { message: 'Product purchase price must be a number' }),
    (0, class_validator_1.IsPositive)({ message: 'Product purchase price must be a positive number' }),
    __metadata("design:type", Number)
], CreateInventoryManagementDto.prototype, "productPurchasePrice", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Product sell price cannot be empty' }),
    (0, class_validator_1.IsNumber)({}, { message: 'Product sell price must be a number' }),
    (0, class_validator_1.IsPositive)({ message: 'Product sell price must be a positive number' }),
    __metadata("design:type", Number)
], CreateInventoryManagementDto.prototype, "productSellPrice", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Brand cannot be empty' }),
    (0, class_validator_1.IsString)({ message: 'Brand must be a string' }),
    (0, class_validator_1.Length)(2, 20, { message: 'Brand must be between 2 and 20 characters' }),
    __metadata("design:type", String)
], CreateInventoryManagementDto.prototype, "porductBrand", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Product quantity cannot be empty' }),
    (0, class_validator_1.IsNumber)({}, { message: 'Product quantity must be a number' }),
    (0, class_validator_1.Min)(0, { message: 'Product quantity cannot be negative' }),
    (0, class_validator_1.IsInt)({ message: 'Product quantity must be an integer' }),
    __metadata("design:type", Number)
], CreateInventoryManagementDto.prototype, "productQuantity", void 0);
//# sourceMappingURL=create-inventory-management.dto.js.map