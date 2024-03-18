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
const class_validator_1 = require("class-validator");
class CreatePurchaseManagementDto {
}
exports.CreatePurchaseManagementDto = CreatePurchaseManagementDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'empty value. Vendor Name cannot be empty' }),
    (0, class_validator_1.Length)(4),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePurchaseManagementDto.prototype, "vendorName", void 0);
__decorate([
    (0, class_validator_1.Length)(1),
    (0, class_validator_1.IsNotEmpty)({ message: 'empty value. Vendor contact cannot be empty' }),
    __metadata("design:type", String)
], CreatePurchaseManagementDto.prototype, "vendorContact", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'empty value. Email be empty' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreatePurchaseManagementDto.prototype, "vendorEmail", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'empty value. Product Name cannot be empty' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(4),
    __metadata("design:type", String)
], CreatePurchaseManagementDto.prototype, "productName", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'empty value. Product Quantity cannot be empty' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreatePurchaseManagementDto.prototype, "productQuantity", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: 'empty value. Product Purchase price cannot be empty',
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreatePurchaseManagementDto.prototype, "productPurchasePrice", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'empty value. Purchase total Price cannot be empty' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreatePurchaseManagementDto.prototype, "purchaseTotalPrice", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'empty value. Date cannot be empty' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", String)
], CreatePurchaseManagementDto.prototype, "purchaseDate", void 0);
//# sourceMappingURL=create-purchase-management.dto.js.map