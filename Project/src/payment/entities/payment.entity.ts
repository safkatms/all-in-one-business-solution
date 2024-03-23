// src/payment/entities/payment.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Package } from '../../package/entities/package.entity';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cardNumber: string; // Consider storing only a token or masked number for security

  @Column()
  cardExpiry: string;

  @Column()
  cardCVC: string; // Storing CVC is generally not recommended; consider removing

  @Column()
  amount: number;

  @ManyToOne(() => Package, pkg => pkg.id, { eager: false })
  @JoinColumn({ name: 'packageId' })
  package: Package;

  @Column()
  packageId: number;
}
