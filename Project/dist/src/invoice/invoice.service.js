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
exports.InvoiceService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const order_entity_1 = require("../order/entities/order.entity");
let InvoiceService = class InvoiceService {
    constructor(orderRepository) {
        this.orderRepository = orderRepository;
    }
    async generateInvoiceForOrder(orderId) {
        const order = await this.orderRepository.findOne({
            where: { orderId: orderId },
            relations: ['orderItems'],
        });
        if (!order) {
            throw new Error('Order not found');
        }
        const invoiceData = {
            orderId: order.orderId,
            customerName: order.customer,
            items: order.orderItems.map(item => ({
                productId: item.productId,
                productName: item.productName,
                quantity: item.quantity,
                price: item.price,
            })),
            totalAmount: order.orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
        };
        return invoiceData;
    }
};
exports.InvoiceService = InvoiceService;
exports.InvoiceService = InvoiceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], InvoiceService);
//# sourceMappingURL=invoice.service.js.map