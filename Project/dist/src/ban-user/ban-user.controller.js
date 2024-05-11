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
exports.BanUserController = void 0;
const common_1 = require("@nestjs/common");
const ban_user_service_1 = require("./ban-user.service");
const jwt_guard_1 = require("../guards/jwt.guard");
const role_guard_1 = require("../guards/role.guard");
const swagger_1 = require("@nestjs/swagger");
let BanUserController = class BanUserController {
    constructor(banUserService) {
        this.banUserService = banUserService;
    }
    getAllUsers() {
        return this.banUserService.getAllUsers();
    }
    banUser(userId) {
        return this.banUserService.updateBanStatus(userId, true);
    }
    unbanUser(userId) {
        return this.banUserService.updateBanStatus(userId, false);
    }
};
exports.BanUserController = BanUserController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all users' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Successfully retrieved list of all users' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BanUserController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.Patch)(':userId/ban'),
    (0, swagger_1.ApiOperation)({ summary: 'Ban a user' }),
    (0, swagger_1.ApiParam)({ name: 'userId', description: 'ID of the user to ban', type: 'number' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User has been banned' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'User not found' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden' }),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BanUserController.prototype, "banUser", null);
__decorate([
    (0, common_1.Patch)(':userId/unban'),
    (0, swagger_1.ApiOperation)({ summary: 'Unban a user' }),
    (0, swagger_1.ApiParam)({ name: 'userId', description: 'ID of the user to unban', type: 'number' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User has been unbanned' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'User not found' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden' }),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BanUserController.prototype, "unbanUser", null);
exports.BanUserController = BanUserController = __decorate([
    (0, swagger_1.ApiTags)('Ban User'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Controller)('ban-user'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, new role_guard_1.RoleGuard(['admin'])),
    __metadata("design:paramtypes", [ban_user_service_1.BanUserService])
], BanUserController);
//# sourceMappingURL=ban-user.controller.js.map