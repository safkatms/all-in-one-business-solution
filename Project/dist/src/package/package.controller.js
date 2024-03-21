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
exports.PackageController = void 0;
const common_1 = require("@nestjs/common");
const package_service_1 = require("./package.service");
const create_package_dto_1 = require("./dto/create-package.dto");
const common_2 = require("@nestjs/common");
const role_guard_1 = require("../guards/role.guard");
const update_package_dto_1 = require("./dto/update-package.dto");
const jwt_guard_1 = require("../guards/jwt.guard");
let PackageController = class PackageController {
    constructor(packageService) {
        this.packageService = packageService;
    }
    createPackage(req, createPackageDto) {
        const userId = req.user.userId;
        return this.packageService.createPackage(userId, createPackageDto);
    }
    async getUserPackage(req) {
        const userPackage = req.user.packageId;
        if (!userPackage) {
            throw new common_1.NotFoundException('User does not have an associated package');
        }
        return this.packageService.findById(userPackage);
    }
    async updatePackage(updatePackageDto, req) {
        const packageId = req.user.packageId;
        return this.packageService.updatePackage(packageId, updatePackageDto);
    }
};
exports.PackageController = PackageController;
__decorate([
    (0, common_1.Post)('/purchase'),
    __param(0, (0, common_2.Request)()),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_package_dto_1.CreatePackageDto]),
    __metadata("design:returntype", void 0)
], PackageController.prototype, "createPackage", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_2.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PackageController.prototype, "getUserPackage", null);
__decorate([
    (0, common_1.Put)('/renew'),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(1, (0, common_2.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_package_dto_1.UpdatePackageDto, Object]),
    __metadata("design:returntype", Promise)
], PackageController.prototype, "updatePackage", null);
exports.PackageController = PackageController = __decorate([
    (0, common_1.Controller)('packages'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, new role_guard_1.RoleGuard(['owner'])),
    __metadata("design:paramtypes", [package_service_1.PackageService])
], PackageController);
//# sourceMappingURL=package.controller.js.map