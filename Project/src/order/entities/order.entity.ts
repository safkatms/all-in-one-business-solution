import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { OrderItem } from './order-item.entity';
import { Customer } from 'src/customer/entities/customer.entity';

export enum OrderStatus {
  Pending = 'pending',
  Completed = 'completed',
  Returned = 'returned',
}
@Entity("order")
export class Order {
  @PrimaryGeneratedColumn()
  orderId: number;

  // Maintains the primary FK relationship for data integrity.
  @ManyToOne(() => Customer, (customer) => customer.orders)
  @JoinColumn({ name: "customerId" })
  customer: Customer;

  @Column()
  customerContact: string;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems: OrderItem[];

  @Column({ type: 'numeric', default: 0 })
  totalPrice: number;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.Pending,
  })
  orderStatus: OrderStatus;
}
