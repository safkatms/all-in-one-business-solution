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
exports.EmployeeController = void 0;
const common_1 = require("@nestjs/common");
const employee_service_1 = require("./employee.service");
const create_employee_dto_1 = require("./dto/create-employee.dto");
const jwt_guard_1 = require("../guards/jwt.guard");
const schema_guard_1 = require("../guards/schema.guard");
const role_guard_1 = require("../guards/role.guard");
const swagger_1 = require("@nestjs/swagger");
let EmployeeController = class EmployeeController {
    constructor(employeeService) {
        this.employeeService = employeeService;
    }
    async register(createEmployeeDto, req) {
        const { company, packageId } = req.user;
        return this.employeeService.registerEmployee(createEmployeeDto, company, packageId);
    }
    async findAll(req) {
        return this.employeeService.findAll();
    }
    remove(id, req) {
        const company = req.company;
        return this.employeeService.remove(+id, company);
    }
};
exports.EmployeeController = EmployeeController;
__decorate([
    (0, common_1.Post)('/registration'),
    (0, swagger_1.ApiOperation)({ summary: 'Register a new employee' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Employee registered successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request.' }),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_employee_dto_1.CreateEmployeeDto, Object]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "register", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Find all employees' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all employees.' }),
    (0, common_1.UseGuards)(schema_guard_1.SetSchemaGuard),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "findAll", null);
__decorate([
    (0, common_1.Delete)('/remove/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Remove an employee' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Employee removed successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Employee not found.' }),
    (0, common_1.UseGuards)(schema_guard_1.SetSchemaGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], EmployeeController.prototype, "remove", null);
exports.EmployeeController = EmployeeController = __decorate([
    (0, swagger_1.ApiTags)('employee'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Controller)('employee'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, new role_guard_1.RoleGuard(['owner', 'hr'])),
    __metadata("design:paramtypes", [employee_service_1.EmployeeService])
], EmployeeController);
//# sourceMappingURL=employee.controller.js.map