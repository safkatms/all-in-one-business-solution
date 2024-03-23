"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BanUserModule = void 0;
const common_1 = require("@nestjs/common");
const ban_user_service_1 = require("./ban-user.service");
const ban_user_controller_1 = require("./ban-user.controller");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../user/entities/user.entity");
let BanUserModule = class BanUserModule {
};
exports.BanUserModule = BanUserModule;
exports.BanUserModule = BanUserModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.User])],
        controllers: [ban_user_controller_1.BanUserController],
        providers: [ban_user_service_1.BanUserService],
    })
], BanUserModule);
//# sourceMappingURL=ban-user.module.js.map