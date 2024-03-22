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
exports.DeliveryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const order_entity_1 = require("../../order/entities/order.entity");
const inventory_management_entity_1 = require("../../inventory-management/entities/inventory-management.entity");
const order_item_entity_1 = require("../../order/entities/order-item.entity");
let DeliveryService = class DeliveryService {
    constructor(orderRepository, inventoryRepository, orderItemRepository) {
        this.orderRepository = orderRepository;
        this.inventoryRepository = inventoryRepository;
        this.orderItemRepository = orderItemRepository;
    }
    async makeDelivery(id, updateDeliveryDto) {
        const { status } = updateDeliveryDto;
        const orderChk = await this.orderRepository.findOne({
            where: { orderId: id },
        });
        if (!orderChk) {
            throw new common_1.NotFoundException(`Order with ID ${id} not found`);
        }
        if (status === order_entity_1.OrderStatus.Completed) {
            orderChk.orderStatus = status;
            await this.orderRepository.save(orderChk);
            const orderItems = await this.orderItemRepository.find({
                where: { orderId: id },
            });
            for (const item of orderItems) {
                const inventoryItem = await this.inventoryRepository.findOne({
                    where: { productId: item.productId },
                });
                if (inventoryItem) {
                    inventoryItem.productQuantity -= item.quantity;
                    await this.inventoryRepository.save(inventoryItem);
                }
            }
            return `Order #${id} status updated to ${status}`;
        }
        else {
            throw new common_1.BadRequestException('Invalid status provided');
        }
    }
    async findOne(id) {
        const orderchk = await this.orderRepository.findOne({
            where: { orderId: id },
        });
        if (!orderchk) {
            throw new common_1.NotFoundException(`Order with ID ${id} not found`);
        }
        return orderchk;
    }
    async returnedDelivery(id, updateDeliveryDto) {
        const { status } = updateDeliveryDto;
        const orderChk = await this.orderRepository.findOne({
            where: { orderId: id },
        });
        if (!orderChk) {
            throw new common_1.NotFoundException(`Order with ID ${id} not found`);
        }
        if (status === order_entity_1.OrderStatus.Returned) {
            orderChk.orderStatus = status;
            await this.orderRepository.save(orderChk);
            return `Order #${id} status updated to ${status}`;
        }
        else {
            throw new common_1.BadRequestException('Invalid status provided');
        }
    }
};
exports.DeliveryService = DeliveryService;
exports.DeliveryService = DeliveryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __param(1, (0, typeorm_1.InjectRepository)(inventory_management_entity_1.InventoryManagement)),
    __param(2, (0, typeorm_1.InjectRepository)(order_item_entity_1.OrderItem)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], DeliveryService);
//# sourceMappingURL=delivery.service.js.map