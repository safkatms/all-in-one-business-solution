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
exports.ValidPackageGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const package_service_1 = require("../package/package.service");
let ValidPackageGuard = class ValidPackageGuard {
    constructor(reflector, packageService) {
        this.reflector = reflector;
        this.packageService = packageService;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        if (!user || !user.packageId) {
            throw new common_1.UnauthorizedException('No package associated with user account');
        }
        const userPackage = await this.packageService.findById(user.packageId);
        if (!userPackage) {
            throw new common_1.UnauthorizedException('No package found for this user');
        }
        const currentDate = new Date();
        if (currentDate > userPackage.validTill) {
            throw new common_1.UnauthorizedException('User package has expired');
        }
        return true;
    }
};
exports.ValidPackageGuard = ValidPackageGuard;
exports.ValidPackageGuard = ValidPackageGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        package_service_1.PackageService])
], ValidPackageGuard);
//# sourceMappingURL=package.guard.js.map