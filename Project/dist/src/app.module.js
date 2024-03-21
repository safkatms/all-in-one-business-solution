"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const user_module_1 = require("./user/user.module");
const auth_module_1 = require("./auth/auth.module");
const typeorm_1 = require("@nestjs/typeorm");
const ormconfig_1 = require("../ormconfig");
const package_module_1 = require("./package/package.module");
const employee_module_1 = require("./employee/employee.module");
const inventory_management_module_1 = require("./inventory-management/inventory-management.module");
const purchase_management_module_1 = require("./purchase-management/purchase-management.module");
const search_module_1 = require("./search/search.module");
const payroll_module_1 = require("./payroll/payroll.module");
const customer_module_1 = require("./customer/customer.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            typeorm_1.TypeOrmModule.forRoot(ormconfig_1.config),
            package_module_1.PackageModule,
            employee_module_1.EmployeeModule,
            inventory_management_module_1.InventoryManagementModule,
            purchase_management_module_1.PurchaseManagementModule,
            search_module_1.SearchModule,
            payroll_module_1.PayrollModule,
            customer_module_1.CustomerModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map