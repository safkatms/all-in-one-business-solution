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
exports.PaymentController = void 0;
const common_1 = require("@nestjs/common");
const payment_service_1 = require("./payment.service");
const create_payment_dto_1 = require("./dto/create-payment.dto");
const jwt_guard_1 = require("../guards/jwt.guard");
const role_guard_1 = require("../guards/role.guard");
const swagger_1 = require("@nestjs/swagger");
let PaymentController = class PaymentController {
    constructor(paymentService) {
        this.paymentService = paymentService;
    }
    makePayment(req, createPaymentDto) {
        const userId = req.user.userId;
        return this.paymentService.makePayment(userId, createPaymentDto);
    }
};
exports.PaymentController = PaymentController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Make a payment' }),
    (0, common_1.Post)(),
    (0, swagger_1.ApiBody)({ type: create_payment_dto_1.CreatePaymentDto }),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Payment successfully processed' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Invalid request payload' }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Unauthorized' }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ description: 'Internal server error' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_payment_dto_1.CreatePaymentDto]),
    __metadata("design:returntype", void 0)
], PaymentController.prototype, "makePayment", null);
exports.PaymentController = PaymentController = __decorate([
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiTags)('Payments'),
    (0, common_1.Controller)('payments'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, new role_guard_1.RoleGuard(['owner'])),
    __metadata("design:paramtypes", [payment_service_1.PaymentService])
], PaymentController);
//# sourceMappingURL=payment.controller.js.map