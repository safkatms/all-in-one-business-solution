import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Order } from './order.entity';

@Entity("orderItem")
export class OrderItem {
  @PrimaryGeneratedColumn()
  orderItemId: number;

  @Column()
  orderId: number;

  @ManyToOne(() => Order, (order) => order.orderItems)
  @JoinColumn({ name: "orderId" }) // Ensure this matches your DB schema
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
