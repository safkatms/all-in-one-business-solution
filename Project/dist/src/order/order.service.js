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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const order_entity_1 = require("./entities/order.entity");
const order_item_entity_1 = require("./entities/order-item.entity");
const inventory_management_entity_1 = require("../inventory-management/entities/inventory-management.entity");
const customer_entity_1 = require("../customer/entities/customer.entity");
let OrderService = class OrderService {
    constructor(orderRepository, orderItemRepository, inventoryRepository, customerRepository) {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.inventoryRepository = inventoryRepository;
        this.customerRepository = customerRepository;
    }
    async createOrder(userName, createOrderDto) {
        const customer = await this.customerRepository.findOne({
            where: { contact: createOrderDto.customerContact },
        });
        if (!customer) {
            return { message: "Order creation failed: Customer with provided contact does not exist." };
        }
        const order = this.orderRepository.create({
            customer: customer,
            customerContact: customer.contact,
            soldBy: userName
        });
        await this.orderRepository.save(order);
        return { message: "Order successfully created.", order: order };
    }
    async addOrderItems(orderId, body) {
        const items = Array.isArray(body.items) ? body.items : [body];
        let totalPrice = 0;
        const order = await this.orderRepository.findOneBy({ orderId });
        if (!order) {
            throw new common_1.NotFoundException(`Order with ID ${orderId} not found.`);
        }
        for (const itemDto of items) {
            const product = await this.inventoryRepository.findOne({
                where: [
                    { productId: itemDto.productId },
                    { productName: itemDto.productName },
                ],
            });
            const price = product.productSellPrice * itemDto.quantity;
            totalPrice += price;
            const orderItem = this.orderItemRepository.create({
                orderId: order.orderId,
                productId: product.productId,
                productName: product.productName,
                quantity: itemDto.quantity,
                price,
            });
            await this.orderItemRepository.save(orderItem);
        }
        order.totalPrice += totalPrice;
        await this.orderRepository.save(order);
        return order;
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __param(1, (0, typeorm_1.InjectRepository)(order_item_entity_1.OrderItem)),
    __param(2, (0, typeorm_1.InjectRepository)(inventory_management_entity_1.InventoryManagement)),
    __param(3, (0, typeorm_1.InjectRepository)(customer_entity_1.Customer)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], OrderService);
//# sourceMappingURL=order.service.js.map