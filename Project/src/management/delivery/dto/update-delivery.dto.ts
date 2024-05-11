import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from 'src/order/entities/order.entity';

export class UpdateDeliveryDto {
  @ApiProperty({
    example: 'completed or returned',
    description: 'Status of the delivery',
  })
  status: OrderStatus;
}
