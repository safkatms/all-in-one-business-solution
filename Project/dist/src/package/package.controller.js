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
let PackageController = class PackageController {
    constructor(packageService) {
        this.packageService = packageService;
    }
    createPackage(userId, createPackageDto) {
        return this.packageService.createPackage(userId, createPackageDto);
    }
};
exports.PackageController = PackageController;
__decorate([
    (0, common_1.Post)('/:userId'),
    __param(0, (0, common_1.Param)('userId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_package_dto_1.CreatePackageDto]),
    __metadata("design:returntype", void 0)
], PackageController.prototype, "createPackage", null);
exports.PackageController = PackageController = __decorate([
    (0, common_1.Controller)('packages'),
    __metadata("design:paramtypes", [package_service_1.PackageService])
], PackageController);
//# sourceMappingURL=package.controller.js.map