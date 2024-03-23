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
exports.FindProductDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class FindProductDto {
}
exports.FindProductDto = FindProductDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: 'Name of the product',
        example: 'Smartphone',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FindProductDto.prototype, "productName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: 'Details of the product',
        example: 'High-resolution display, 128GB storage',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FindProductDto.prototype, "productDetails", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: 'Purchase price of the product',
        example: 599.99,
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], FindProductDto.prototype, "productPurchasePrice", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: 'Sell price of the product',
        example: 799.99,
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], FindProductDto.prototype, "productSellPrice", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: 'Brand of the product',
        example: 'Apple',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FindProductDto.prototype, "porductBrand", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: 'Quantity of the product',
        example: 100,
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], FindProductDto.prototype, "productQuantity", void 0);
//# sourceMappingURL=find-product.dto.js.map