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
exports.OrderController = void 0;
const common_1 = require("@nestjs/common");
const order_service_1 = require("./order.service");
const create_order_dto_1 = require("./dto/create-order.dto");
const add_order_item_dto_1 = require("./dto/add-order-item.dto");
const jwt_guard_1 = require("../guards/jwt.guard");
const schema_guard_1 = require("../guards/schema.guard");
const role_guard_1 = require("../guards/role.guard");
const check_product_guard_1 = require("../guards/check-product.guard");
const swagger_1 = require("@nestjs/swagger");
let OrderController = class OrderController {
    constructor(orderService) {
        this.orderService = orderService;
    }
    createOrder(createOrderDto, req) {
        const userName = req.user.username;
        return this.orderService.createOrder(userName, createOrderDto);
    }
    addOrderItems(orderId, itemsDto) {
        return this.orderService.addOrderItems(orderId, itemsDto);
    }
};
exports.OrderController = OrderController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiBody)({ type: create_order_dto_1.CreateOrderDto }),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Order successfully created' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Invalid request payload' }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Unauthorized' }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ description: 'Internal server error' }),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_order_dto_1.CreateOrderDto, Object]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "createOrder", null);
__decorate([
    (0, common_1.Post)(':orderId/items'),
    (0, swagger_1.ApiParam)({ name: 'orderId', description: 'ID of the order' }),
    (0, swagger_1.ApiBody)({ type: add_order_item_dto_1.AddOrderItemDto, isArray: true }),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Items successfully added to the order' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Invalid request payload' }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ description: 'Internal server error' }),
    (0, common_1.UseGuards)(check_product_guard_1.CheckProductGuard),
    __param(0, (0, common_1.Param)('orderId')),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Array]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "addOrderItems", null);
exports.OrderController = OrderController = __decorate([
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiTags)('Order'),
    (0, common_1.Controller)('order'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, schema_guard_1.SetSchemaGuard, new role_guard_1.RoleGuard(['owner', 'salesman'])),
    __metadata("design:paramtypes", [order_service_1.OrderService])
], OrderController);
//# sourceMappingURL=order.controller.js.map