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
exports.AddOrderItemDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class AddOrderItemDto {
}
exports.AddOrderItemDto = AddOrderItemDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: Number, description: 'ID of the product' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)({ message: 'productId must be an integer' }),
    __metadata("design:type", Number)
], AddOrderItemDto.prototype, "productId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: String, description: 'Name of the product' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'productName must be a string' }),
    __metadata("design:type", String)
], AddOrderItemDto.prototype, "productName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'Quantity of the product' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Quantity cannot be empty' }),
    (0, class_validator_1.IsNumber)({}, { message: 'Quantity must be a number' }),
    (0, class_validator_1.Min)(1, { message: 'Quantity must be at least 1' }),
    __metadata("design:type", Number)
], AddOrderItemDto.prototype, "quantity", void 0);
//# sourceMappingURL=add-order-item.dto.js.map