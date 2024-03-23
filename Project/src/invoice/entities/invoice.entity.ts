import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Order } from '../../order/entities/order.entity';

@Entity()
export class Invoice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalAmount: number;

  @OneToOne(() => Order)
  @JoinColumn()
  order: Order;
}
