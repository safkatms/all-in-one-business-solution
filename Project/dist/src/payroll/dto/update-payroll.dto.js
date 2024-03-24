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
exports.UpdatePayrollDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const create_payroll_dto_1 = require("./create-payroll.dto");
class UpdatePayrollDto {
}
exports.UpdatePayrollDto = UpdatePayrollDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Bonus amount (optional)',
        type: Number,
        example: 200
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({}, { message: 'Bonus must be a number if provided' }),
    __metadata("design:type", Number)
], UpdatePayrollDto.prototype, "bonus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Payroll status (Paid or Unpaid, optional)',
        enum: create_payroll_dto_1.PayrollStatus,
        example: create_payroll_dto_1.PayrollStatus.Unpaid
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(create_payroll_dto_1.PayrollStatus, { message: 'Status must be either "Paid" or "Unpaid" if provided' }),
    __metadata("design:type", String)
], UpdatePayrollDto.prototype, "status", void 0);
//# sourceMappingURL=update-payroll.dto.js.map