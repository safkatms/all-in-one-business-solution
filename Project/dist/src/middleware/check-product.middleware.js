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
exports.CheckProductGuard = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const inventory_management_entity_1 = require("../inventory-management/entities/inventory-management.entity");
const order_item_entity_1 = require("../order/entities/order-item.entity");
let CheckProductGuard = class CheckProductGuard {
    constructor(inventoryRepository, orderItemRepository) {
        this.inventoryRepository = inventoryRepository;
        this.orderItemRepository = orderItemRepository;
    }
    async canActivate(context) {
        const req = context.switchToHttp().getRequest();
        const orderId = +req.params.orderId;
        const existingItemsCount = await this.orderItemRepository.count({ where: { order: { orderId: orderId } } });
        if (existingItemsCount > 0) {
            throw new common_1.BadRequestException(`Order ${orderId} already has items. No additional items can be added.`);
        }
        const items = Array.isArray(req.body.items) ? req.body.items : [req.body];
        for (const item of items) {
            console.log(`Checking item:`, item);
            if (!item.productId && !item.productName) {
                throw new common_1.BadRequestException('Product identifier not provided.');
            }
            let product = null;
            if (item.productId) {
                console.log(`Looking for product with ID: ${item.productId}`);
                product = await this.inventoryRepository.findOneBy({ productId: item.productId });
            }
            else if (item.productName) {
                console.log(`Looking for product with Name: ${item.productName}`);
                product = await this.inventoryRepository.findOne({ where: { productName: item.productName } });
            }
            if (!product) {
                throw new common_1.NotFoundException(`Product not found for ID: ${item.productId} or Name: "${item.productName}".`);
            }
            if (product.productQuantity < item.quantity) {
                throw new common_1.BadRequestException(`Insufficient quantity for product ID: ${item.productId} or Name: "${item.productName}". Available: ${product.productQuantity}, requested: ${item.quantity}.`);
            }
        }
        return true;
    }
};
exports.CheckProductGuard = CheckProductGuard;
exports.CheckProductGuard = CheckProductGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(inventory_management_entity_1.InventoryManagement)),
    __param(1, (0, typeorm_1.InjectRepository)(order_item_entity_1.OrderItem)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CheckProductGuard);
//# sourceMappingURL=check-product.middleware.js.map