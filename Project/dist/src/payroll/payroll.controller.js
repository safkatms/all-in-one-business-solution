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
exports.PayrollController = void 0;
const common_1 = require("@nestjs/common");
const payroll_service_1 = require("./payroll.service");
const create_payroll_dto_1 = require("./dto/create-payroll.dto");
const update_payroll_dto_1 = require("./dto/update-payroll.dto");
const role_guard_1 = require("../guards/role.guard");
const jwt_guard_1 = require("../guards/jwt.guard");
const schema_guard_1 = require("../guards/schema.guard");
let PayrollController = class PayrollController {
    constructor(payrollService) {
        this.payrollService = payrollService;
    }
    createPayroll(createPayrollDto) {
        return this.payrollService.create(createPayrollDto);
    }
    getAllPayroll() {
        return this.payrollService.findAll();
    }
    async updatePayrollStatus(employeeId, payrollMonth, updatePayrollDto) {
        return this.payrollService.update(employeeId, payrollMonth, updatePayrollDto);
    }
};
exports.PayrollController = PayrollController;
__decorate([
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_payroll_dto_1.CreatePayrollDto]),
    __metadata("design:returntype", void 0)
], PayrollController.prototype, "createPayroll", null);
__decorate([
    (0, common_1.Get)('/records'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PayrollController.prototype, "getAllPayroll", null);
__decorate([
    (0, common_1.Patch)('/update/:employeeId/:payrollMonth'),
    __param(0, (0, common_1.Param)('employeeId')),
    __param(1, (0, common_1.Param)('payrollMonth')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, update_payroll_dto_1.UpdatePayrollDto]),
    __metadata("design:returntype", Promise)
], PayrollController.prototype, "updatePayrollStatus", null);
exports.PayrollController = PayrollController = __decorate([
    (0, common_1.Controller)('payroll'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, schema_guard_1.SetSchemaGuard, new role_guard_1.RoleGuard(['owner', 'hr'])),
    __metadata("design:paramtypes", [payroll_service_1.PayrollService])
], PayrollController);
//# sourceMappingURL=payroll.controller.js.map