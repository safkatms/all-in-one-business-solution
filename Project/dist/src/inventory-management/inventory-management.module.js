"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryManagementModule = void 0;
const common_1 = require("@nestjs/common");
const inventory_management_service_1 = require("./inventory-management.service");
const inventory_management_controller_1 = require("./inventory-management.controller");
const inventory_management_entity_1 = require("./entities/inventory-management.entity");
const typeorm_1 = require("@nestjs/typeorm");
const middleware_middleware_1 = require("./middleware/middleware.middleware");
let InventoryManagementModule = class InventoryManagementModule {
    configure(consumer) {
        consumer
            .apply(middleware_middleware_1.InventoryValidationMiddleware)
            .exclude({ path: 'inventory-management', method: common_1.RequestMethod.GET })
            .forRoutes({ path: 'inventory-management/add-item', method: common_1.RequestMethod.POST }, {
            path: 'inventory-management/modify-item/:id',
            method: common_1.RequestMethod.PATCH,
        });
    }
};
exports.InventoryManagementModule = InventoryManagementModule;
exports.InventoryManagementModule = InventoryManagementModule = __decorate([
    (0, common_1.Module)({
        controllers: [inventory_management_controller_1.InventoryManagementController],
        providers: [inventory_management_service_1.InventoryManagementService],
        imports: [typeorm_1.TypeOrmModule.forFeature([inventory_management_entity_1.InventoryManagement])],
        exports: [inventory_management_service_1.InventoryManagementService],
    })
], InventoryManagementModule);
//# sourceMappingURL=inventory-management.module.js.map