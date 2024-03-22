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
exports.DeliveryController = void 0;
const common_1 = require("@nestjs/common");
const delivery_service_1 = require("./delivery.service");
const update_delivery_dto_1 = require("./dto/update-delivery.dto");
const jwt_guard_1 = require("../../guards/jwt.guard");
const role_guard_1 = require("../../guards/role.guard");
const schema_guard_1 = require("../../guards/schema.guard");
const deliveryManagement_guard_1 = require("./guard/deliveryManagement.guard");
let DeliveryController = class DeliveryController {
    constructor(deliveryService) {
        this.deliveryService = deliveryService;
    }
    makeDelivery(id, updateDeliveryDto) {
        return this.deliveryService.makeDelivery(+id, updateDeliveryDto);
    }
    findOne(id) {
        return this.deliveryService.findOne(+id);
    }
    returnDelivery(id, updateDeliveryDto) {
        return this.deliveryService.returnedDelivery(+id, updateDeliveryDto);
    }
};
exports.DeliveryController = DeliveryController;
__decorate([
    (0, common_1.UseGuards)(deliveryManagement_guard_1.DeliveryManagementValidIdGuard),
    (0, common_1.Patch)('make-delivery/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_delivery_dto_1.UpdateDeliveryDto]),
    __metadata("design:returntype", void 0)
], DeliveryController.prototype, "makeDelivery", null);
__decorate([
    (0, common_1.UseGuards)(deliveryManagement_guard_1.DeliveryManagementValidIdGuard),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DeliveryController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(deliveryManagement_guard_1.DeliveryManagementValidIdGuard),
    (0, common_1.Patch)('returned-delivery/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_delivery_dto_1.UpdateDeliveryDto]),
    __metadata("design:returntype", void 0)
], DeliveryController.prototype, "returnDelivery", null);
exports.DeliveryController = DeliveryController = __decorate([
    (0, common_1.Controller)('delivery'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, schema_guard_1.SetSchemaGuard, new role_guard_1.RoleGuard(['inventory_manager', 'owner'])),
    __metadata("design:paramtypes", [delivery_service_1.DeliveryService])
], DeliveryController);
//# sourceMappingURL=delivery.controller.js.map