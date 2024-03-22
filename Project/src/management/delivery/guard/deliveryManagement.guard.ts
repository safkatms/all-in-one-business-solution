import {
  Injectable,
  CanActivate,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from 'src/order/entities/order.entity';

@Injectable()
export class DeliveryManagementValidIdGuard implements CanActivate {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const id = +request.params.id;

    const orderChk = await this.orderRepository.findOne({
      where: { orderId: id },
    });

    if (!orderChk) {
      console.log('inside delivery man guard');
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    return true;
  }
}
