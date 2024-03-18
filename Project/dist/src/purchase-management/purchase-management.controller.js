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
exports.PurchaseManagementController = void 0;
const common_1 = require("@nestjs/common");
const purchase_management_service_1 = require("./purchase-management.service");
const create_purchase_management_dto_1 = require("./dto/create-purchase-management.dto");
const update_purchase_management_dto_1 = require("./dto/update-purchase-management.dto");
const jwt_guard_1 = require("../guards/jwt.guard");
const schema_guard_1 = require("../guards/schema.guard");
const role_guard_1 = require("../guards/role.guard");
let PurchaseManagementController = class PurchaseManagementController {
    constructor(purchaseManagementService) {
        this.purchaseManagementService = purchaseManagementService;
    }
    create(createPurchaseManagementDto) {
        return this.purchaseManagementService.insertPurchase(createPurchaseManagementDto);
    }
    findAll() {
        return this.purchaseManagementService.findAllPurchaseDetails();
    }
    findOne(id) {
        return this.purchaseManagementService.findPurchaseById(+id);
    }
    update(id, updatePurchaseManagementDto) {
        return this.purchaseManagementService.modifyPurchaseInfo(+id, updatePurchaseManagementDto);
    }
    remove(id) {
        return this.purchaseManagementService.remove(+id);
    }
};
exports.PurchaseManagementController = PurchaseManagementController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_purchase_management_dto_1.CreatePurchaseManagementDto]),
    __metadata("design:returntype", void 0)
], PurchaseManagementController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PurchaseManagementController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PurchaseManagementController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_purchase_management_dto_1.UpdatePurchaseManagementDto]),
    __metadata("design:returntype", void 0)
], PurchaseManagementController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PurchaseManagementController.prototype, "remove", null);
exports.PurchaseManagementController = PurchaseManagementController = __decorate([
    (0, common_1.Controller)('purchase-management'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, schema_guard_1.SetSchemaGuard, new role_guard_1.RoleGuard(['inventory_manager', 'owner'])),
    __metadata("design:paramtypes", [purchase_management_service_1.PurchaseManagementService])
], PurchaseManagementController);
//# sourceMappingURL=purchase-management.controller.js.map