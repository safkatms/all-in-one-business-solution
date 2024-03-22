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
let OrderService = class OrderService {
    constructor(orderRepository, orderItemRepository, inventoryRepository) {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.inventoryRepository = inventoryRepository;
    }
    async createOrder(createOrderDto) {
        const order = this.orderRepository.create(createOrderDto);
        await this.orderRepository.save(order);
        return order;
    }
    async addOrderItem(orderId, addOrderItemDto) {
        const order = await this.orderRepository.findOneBy({ orderId });
        if (!order) {
            throw new common_1.NotFoundException(`Order with ID ${orderId} not found.`);
        }
        let product;
        if (addOrderItemDto.productId) {
            product = await this.inventoryRepository.findOneBy({ productId: addOrderItemDto.productId });
        }
        else {
            product = await this.inventoryRepository.findOneBy({ productName: addOrderItemDto.productName });
        }
        if (!product) {
            throw new common_1.NotFoundException('Product not found.');
        }
        if (product.productQuantity < addOrderItemDto.quantity) {
            throw new common_1.BadRequestException('Not enough product quantity available.');
        }
        product.productQuantity -= addOrderItemDto.quantity;
        await this.inventoryRepository.save(product);
        const orderItem = this.orderItemRepository.create({
            orderId,
            productId: product.productId,
            productName: product.productName,
            quantity: addOrderItemDto.quantity,
            price: product.productSellPrice * addOrderItemDto.quantity,
        });
        await this.orderItemRepository.save(orderItem);
        return orderItem;
    }
    async addMultipleOrderItems(orderId, itemsDto) {
        const orderItems = [];
        for (const itemDto of itemsDto) {
            const orderItem = await this.addOrderItem(orderId, itemDto);
            orderItems.push(orderItem);
        }
        return orderItems;
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __param(1, (0, typeorm_1.InjectRepository)(order_item_entity_1.OrderItem)),
    __param(2, (0, typeorm_1.InjectRepository)(inventory_management_entity_1.InventoryManagement)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], OrderService);
//# sourceMappingURL=order.service.js.map