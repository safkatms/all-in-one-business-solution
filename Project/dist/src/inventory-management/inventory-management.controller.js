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
exports.InventoryManagementController = void 0;
const common_1 = require("@nestjs/common");
const inventory_management_service_1 = require("./inventory-management.service");
const create_inventory_management_dto_1 = require("./dto/create-inventory-management.dto");
const update_inventory_management_dto_1 = require("./dto/update-inventory-management.dto");
const jwt_guard_1 = require("../guards/jwt.guard");
const schema_guard_1 = require("../guards/schema.guard");
const role_guard_1 = require("../guards/role.guard");
const swagger_1 = require("@nestjs/swagger");
let InventoryManagementController = class InventoryManagementController {
    constructor(inventoryManagementService) {
        this.inventoryManagementService = inventoryManagementService;
    }
    create(createInventoryManagementDto) {
        return this.inventoryManagementService.create(createInventoryManagementDto);
    }
    findAll() {
        return this.inventoryManagementService.findAll();
    }
    findByUsername(itemName) {
        return this.inventoryManagementService.findByItemName(itemName);
    }
    findOne(id) {
        return this.inventoryManagementService.findOne(+id);
    }
    update(id, updateInventoryManagementDto) {
        return this.inventoryManagementService.update(+id, updateInventoryManagementDto);
    }
    remove(id) {
        return this.inventoryManagementService.remove(+id);
    }
};
exports.InventoryManagementController = InventoryManagementController;
__decorate([
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    (0, common_1.Post)('add-item'),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Item successfully created.' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Bad request. Invalid input.' }),
    (0, swagger_1.ApiConflictResponse)({ description: 'Conflict. Item already exists.' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiBody)({ type: create_inventory_management_dto_1.CreateInventoryManagementDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_inventory_management_dto_1.CreateInventoryManagementDto]),
    __metadata("design:returntype", void 0)
], InventoryManagementController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({ description: 'List of all items.' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], InventoryManagementController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({ description: 'Found item by name.' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Item not found.' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiParam)({ name: 'itemName', description: 'Name of the item' }),
    (0, common_1.Get)('by-name/:itemName'),
    __param(0, (0, common_1.Param)('itemName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], InventoryManagementController.prototype, "findByUsername", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({ description: 'Found item by ID.' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Item not found.' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID of the item' }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], InventoryManagementController.prototype, "findOne", null);
__decorate([
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    (0, common_1.Patch)('modify-item/:id'),
    (0, swagger_1.ApiOkResponse)({ description: 'Item successfully updated.' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Bad request. Invalid input.' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Item not found.' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID of the item' }),
    (0, swagger_1.ApiBody)({ type: create_inventory_management_dto_1.CreateInventoryManagementDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_inventory_management_dto_1.UpdateInventoryManagementDto]),
    __metadata("design:returntype", void 0)
], InventoryManagementController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('remove-item/:id'),
    (0, swagger_1.ApiOkResponse)({ description: 'Item successfully deleted.' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Item not found.' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID of the item' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], InventoryManagementController.prototype, "remove", null);
exports.InventoryManagementController = InventoryManagementController = __decorate([
    (0, swagger_1.ApiTags)('Inventory Management'),
    (0, common_1.Controller)('inventory-management'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, schema_guard_1.SetSchemaGuard, new role_guard_1.RoleGuard(['inventory_manager', 'owner'])),
    __metadata("design:paramtypes", [inventory_management_service_1.InventoryManagementService])
], InventoryManagementController);
//# sourceMappingURL=inventory-management.controller.js.map