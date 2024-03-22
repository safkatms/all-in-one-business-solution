// src/customer/entities/customer.entity.ts

import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Order } from 'src/order/entities/order.entity'; 

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  contact: string;

  @Column({ nullable: false })
  email: string;

  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[]; // Assuming you want to navigate from customers to their orders
}
