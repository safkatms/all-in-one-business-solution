"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const customer_entity_1 = require("./src/customer/entities/customer.entity");
const employee_entity_1 = require("./src/employee/entities/employee.entity");
const inventory_management_entity_1 = require("./src/inventory-management/entities/inventory-management.entity");
const order_item_entity_1 = require("./src/order/entities/order-item.entity");
const order_entity_1 = require("./src/order/entities/order.entity");
const package_entity_1 = require("./src/package/entities/package.entity");
const payroll_entity_1 = require("./src/payroll/entities/payroll.entity");
const purchase_management_entity_1 = require("./src/purchase-management/entities/purchase-management.entity");
const user_entity_1 = require("./src/user/entities/user.entity");
exports.config = {
    type: 'postgres',
    database: 'project',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'admin',
    entities: [user_entity_1.User, package_entity_1.Package, employee_entity_1.Employee, payroll_entity_1.Payroll, inventory_management_entity_1.InventoryManagement, purchase_management_entity_1.PurchaseManagement, customer_entity_1.Customer, order_entity_1.Order, order_item_entity_1.OrderItem],
    synchronize: true,
};
//# sourceMappingURL=ormconfig.js.map