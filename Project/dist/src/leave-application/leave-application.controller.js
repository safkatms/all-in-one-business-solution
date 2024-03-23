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
exports.LeaveApplicationController = void 0;
const common_1 = require("@nestjs/common");
const leave_application_service_1 = require("./leave-application.service");
const create_leave_application_dto_1 = require("./dto/create-leave-application.dto");
const update_leave_application_dto_1 = require("./dto/update-leave-application.dto");
const jwt_guard_1 = require("../guards/jwt.guard");
const schema_guard_1 = require("../guards/schema.guard");
const role_guard_1 = require("../guards/role.guard");
const swagger_1 = require("@nestjs/swagger");
let LeaveApplicationController = class LeaveApplicationController {
    constructor(leaveApplicationService) {
        this.leaveApplicationService = leaveApplicationService;
    }
    async create(req, createLeaveDto) {
        return this.leaveApplicationService.createLeaveApplication(req.user.userId, createLeaveDto);
    }
    findAllPendingApplication() {
        return this.leaveApplicationService.findAllPendingApplication();
    }
    findAll() {
        return this.leaveApplicationService.findAllUpdatedApplication();
    }
    findAllByUserId(req, userId) {
        return this.leaveApplicationService.findAllByUserId(req.user.userId);
    }
    update(id, updateLeaveApplicationDto) {
        return this.leaveApplicationService.updateStatus(+id, updateLeaveApplicationDto);
    }
};
exports.LeaveApplicationController = LeaveApplicationController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(new role_guard_1.RoleGuard(['accountant', 'inventory_manager', 'salesman'])),
    (0, swagger_1.ApiBody)({ type: create_leave_application_dto_1.CreateLeaveApplicationDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_leave_application_dto_1.CreateLeaveApplicationDto]),
    __metadata("design:returntype", Promise)
], LeaveApplicationController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/pending'),
    (0, common_1.UseGuards)(schema_guard_1.SetSchemaGuard, new role_guard_1.RoleGuard(['owner', 'hr'])),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LeaveApplicationController.prototype, "findAllPendingApplication", null);
__decorate([
    (0, common_1.Get)('/history'),
    (0, common_1.UseGuards)(schema_guard_1.SetSchemaGuard, new role_guard_1.RoleGuard(['owner', 'hr'])),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LeaveApplicationController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('user/history'),
    (0, common_1.UseGuards)(schema_guard_1.SetSchemaGuard, new role_guard_1.RoleGuard(['accountant', 'inventory_manager', 'salesman'])),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], LeaveApplicationController.prototype, "findAllByUserId", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(schema_guard_1.SetSchemaGuard, new role_guard_1.RoleGuard(['owner', 'hr'])),
    (0, swagger_1.ApiBody)({ type: update_leave_application_dto_1.UpdateLeaveApplicationDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_leave_application_dto_1.UpdateLeaveApplicationDto]),
    __metadata("design:returntype", void 0)
], LeaveApplicationController.prototype, "update", null);
exports.LeaveApplicationController = LeaveApplicationController = __decorate([
    (0, common_1.Controller)('leave'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiTags)('Leave Applications'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    __metadata("design:paramtypes", [leave_application_service_1.LeaveApplicationService])
], LeaveApplicationController);
//# sourceMappingURL=leave-application.controller.js.map