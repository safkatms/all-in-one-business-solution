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
    (0, class_validator_1.IsNotEmpty)({ message: 'empty value. product Name cannot be empty' }),
    (0, class_validator_1.Length)(2),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateInventoryManagementDto.prototype, "productName", void 0);
__decorate([
    (0, class_validator_1.Length)(2),
    (0, class_validator_1.IsNotEmpty)({ message: 'empty value. product details cannot be empty' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateInventoryManagementDto.prototype, "productDetails", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: 'empty value. product purchase price cannot be empty',
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateInventoryManagementDto.prototype, "productPurchasePrice", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'empty value. sell price cannot be empty' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateInventoryManagementDto.prototype, "productSellPrice", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'empty value. Brand cannot be empty' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateInventoryManagementDto.prototype, "porductBrand", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'empty value. product quantity cannot be empty' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateInventoryManagementDto.prototype, "productQuantity", void 0);
//# sourceMappingURL=create-inventory-management.dto.js.map