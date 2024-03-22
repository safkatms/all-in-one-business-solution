import { OrderStatus } from 'src/order/entities/order.entity';

export class UpdateDeliveryDto {
  status: OrderStatus;
}
