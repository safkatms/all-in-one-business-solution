import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Order } from './order.entity';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  orderItemId: number;

  @Column()
  orderId: number;

  @ManyToOne(() => Order, (order) => order.orderItems)
  order: Order;

  @Column()
  productId: number;

  @Column()
  productName: string;

  @Column()
  quantity: number;

  @Column()
  price: number;
}
