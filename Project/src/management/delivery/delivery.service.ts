import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order, OrderStatus } from 'src/order/entities/order.entity';
import { InventoryManagement } from 'src/inventory-management/entities/inventory-management.entity';
import { OrderItem } from 'src/order/entities/order-item.entity';

@Injectable()
export class DeliveryService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(InventoryManagement)
    private readonly inventoryRepository: Repository<InventoryManagement>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
  ) {}

  //making delivery
  async makeDelivery(id: number, updateDeliveryDto: UpdateDeliveryDto) {
    const { status } = updateDeliveryDto;

    const orderChk = await this.orderRepository.findOne({
      where: { orderId: id },
    });
    if (!orderChk) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    if (status === OrderStatus.Completed) {
      orderChk.orderStatus = status;
      await this.orderRepository.save(orderChk);

      //deduce the quantity in the inventoy managemnt

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

      return {
        message: `Order #${id} status updated to ${status}`,
        inventoryUpdate: 'Inventory quantity deducted successfully',
        order: orderChk,
      };
    } else {
      throw new BadRequestException('Invalid status provided');
    }
  }

  async findOne(id: number) {
    const orderchk = await this.orderRepository.findOne({
      where: { orderId: id },
    });
    if (!orderchk) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return orderchk;
  }

  //returned delivery
  async returnedDelivery(id: number, updateDeliveryDto: UpdateDeliveryDto) {
    const { status } = updateDeliveryDto;

    const orderChk = await this.orderRepository.findOne({
      where: { orderId: id },
    });
    if (!orderChk) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    if (status === OrderStatus.Returned) {
      orderChk.orderStatus = status;
      await this.orderRepository.save(orderChk);

      //add the returned qnty in db
      const orderItems = await this.orderItemRepository.find({
        where: { orderId: id },
      });
      for (const item of orderItems) {
        const inventoryItem = await this.inventoryRepository.findOne({
          where: { productId: item.productId },
        });
        if (inventoryItem) {
          inventoryItem.productQuantity += item.quantity;
          await this.inventoryRepository.save(inventoryItem);
        }
      }
      return {
        message: `Order #${id} status updated to ${status}`,
        inventoryUpdate:
          'Returned items quantity added back to inventory successfully',
        order: orderChk, // Return the updated order object
      };
    } else {
      throw new BadRequestException('Invalid status provided');
    }
  }
  //find all
  async findAll() {
    return await this.orderRepository.find();
  }
}
