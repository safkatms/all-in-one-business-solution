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
exports.CreatePackageDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
var PackageName;
(function (PackageName) {
    PackageName["STANDARD"] = "standard";
    PackageName["PREMIUM"] = "premium";
})(PackageName || (PackageName = {}));
class CreatePackageDto {
}
exports.CreatePackageDto = CreatePackageDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: PackageName,
        enumName: 'PackageName',
        description: 'The name of the package. Can be either "STANDARD" for a standard package or "PREMIUM" for a premium package.',
        example: PackageName.STANDARD
    }),
    (0, class_validator_1.IsEnum)(PackageName, { message: 'Name must be either "standard" or "premium"' }),
    __metadata("design:type", String)
], CreatePackageDto.prototype, "name", void 0);
//# sourceMappingURL=create-package.dto.js.map