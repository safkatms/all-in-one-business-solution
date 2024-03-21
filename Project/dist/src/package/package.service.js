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
exports.PackageService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../user/entities/user.entity");
const package_entity_1 = require("./entities/package.entity");
let PackageService = class PackageService {
    constructor(userRepository, packageRepository) {
        this.userRepository = userRepository;
        this.packageRepository = packageRepository;
    }
    async createPackage(userId, createPackageDto) {
        const user = await this.userRepository.findOneBy({ userId: userId });
        if (user.packageId) {
            const existingPackage = await this.packageRepository.findOne({ where: { id: user.packageId } });
            if (existingPackage && existingPackage.validTill >= new Date()) {
                throw new common_1.ConflictException('User already has an active package');
            }
        }
        const packageEntity = this.packageRepository.create({
            ...createPackageDto,
            validFrom: new Date(),
            validTill: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        });
        await this.packageRepository.save(packageEntity);
        user.packageId = packageEntity.id;
        await this.userRepository.save(user);
        return {
            message: 'Package purchased successfully',
            package: packageEntity,
        };
    }
    async findById(userPackage) {
        const packageEntity = await this.packageRepository.findOne({ where: { id: userPackage } });
        if (!packageEntity) {
            throw new common_1.NotFoundException(`Package with ID ${userPackage} not found`);
        }
        return packageEntity;
    }
    async updatePackage(packageId, updatePackageDto) {
        const packageEntity = await this.packageRepository.findOneBy({
            id: packageId,
        });
        if (!packageEntity) {
            throw new common_1.NotFoundException(`Package with ID ${packageId} not found`);
        }
        if (packageEntity.validTill >= new Date()) {
            return {
                message: 'You already have an active package',
                package: packageEntity,
            };
        }
        const validFrom = new Date();
        const validTill = new Date(validFrom.getTime() + 30 * 24 * 60 * 60 * 1000);
        packageEntity.validFrom = validFrom;
        packageEntity.validTill = validTill;
        return this.packageRepository.save(packageEntity);
    }
};
exports.PackageService = PackageService;
exports.PackageService = PackageService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(package_entity_1.Package)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], PackageService);
//# sourceMappingURL=package.service.js.map