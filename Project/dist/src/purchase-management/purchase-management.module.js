"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseManagementModule = void 0;
const common_1 = require("@nestjs/common");
const purchase_management_service_1 = require("./purchase-management.service");
const purchase_management_controller_1 = require("./purchase-management.controller");
const purchase_management_entity_1 = require("./entities/purchase-management.entity");
const typeorm_1 = require("@nestjs/typeorm");
const middleware_middleware_1 = require("./middleware/middleware.middleware");
let PurchaseManagementModule = class PurchaseManagementModule {
    configure(consumer) {
        consumer.apply(middleware_middleware_1.PurchaseValidationMiddleware).forRoutes({
            path: 'purchase-management/add-purchase',
            method: common_1.RequestMethod.POST,
        }, {
            path: 'purchase-management/modify-purchase/:id',
            method: common_1.RequestMethod.PATCH,
        });
    }
};
exports.PurchaseManagementModule = PurchaseManagementModule;
exports.PurchaseManagementModule = PurchaseManagementModule = __decorate([
    (0, common_1.Module)({
        controllers: [purchase_management_controller_1.PurchaseManagementController],
        providers: [purchase_management_service_1.PurchaseManagementService],
        imports: [typeorm_1.TypeOrmModule.forFeature([purchase_management_entity_1.PurchaseManagement])],
        exports: [purchase_management_service_1.PurchaseManagementService],
    })
], PurchaseManagementModule);
//# sourceMappingURL=purchase-management.module.js.map