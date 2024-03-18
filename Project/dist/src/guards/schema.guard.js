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
exports.SetSchemaGuard = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let SetSchemaGuard = class SetSchemaGuard {
    constructor(connection) {
        this.connection = connection;
    }
    async canActivate(context) {
        const req = context.switchToHttp().getRequest();
        console.log('User:', req.user);
        const user = req.user;
        if (user && user.company) {
            const schemaName = `${user.company}`;
            console.log('Setting search path to:', schemaName);
            await this.connection.query(`SET search_path TO "${schemaName}"`);
        }
        return true;
    }
};
exports.SetSchemaGuard = SetSchemaGuard;
exports.SetSchemaGuard = SetSchemaGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.Connection])
], SetSchemaGuard);
//# sourceMappingURL=schema.guard.js.map