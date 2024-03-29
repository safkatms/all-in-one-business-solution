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
const swagger_1 = require("@nestjs/swagger");
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
    (0, swagger_1.ApiOperation)({ summary: 'Create payroll record' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'The payroll record has been successfully created.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request.' }),
    (0, swagger_1.ApiBody)({ type: create_payroll_dto_1.CreatePayrollDto }),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_payroll_dto_1.CreatePayrollDto]),
    __metadata("design:returntype", void 0)
], PayrollController.prototype, "createPayroll", null);
__decorate([
    (0, common_1.Get)('/records'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all payroll records' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all payroll records.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PayrollController.prototype, "getAllPayroll", null);
__decorate([
    (0, common_1.Patch)('/update/:employeeId/:payrollMonth'),
    (0, swagger_1.ApiOperation)({ summary: 'Update payroll status' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'The payroll status has been successfully updated.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Not found.' }),
    (0, swagger_1.ApiParam)({ name: 'employeeId', type: 'number', description: 'Employee ID' }),
    (0, swagger_1.ApiParam)({ name: 'payrollMonth', type: 'string', description: 'Payroll month in YYYY-MM format' }),
    (0, swagger_1.ApiBody)({ type: update_payroll_dto_1.UpdatePayrollDto }),
    __param(0, (0, common_1.Param)('employeeId')),
    __param(1, (0, common_1.Param)('payrollMonth')),
    __param(2, (0, common_1.Body)(new common_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, update_payroll_dto_1.UpdatePayrollDto]),
    __metadata("design:returntype", Promise)
], PayrollController.prototype, "updatePayrollStatus", null);
exports.PayrollController = PayrollController = __decorate([
    (0, swagger_1.ApiTags)('Payroll'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Controller)('payroll'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, schema_guard_1.SetSchemaGuard, new role_guard_1.RoleGuard(['owner', 'hr'])),
    __metadata("design:paramtypes", [payroll_service_1.PayrollService])
], PayrollController);
//# sourceMappingURL=payroll.controller.js.map