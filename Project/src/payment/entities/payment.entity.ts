import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Package } from '../../package/entities/package.entity';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cardNumber: string; 

  @Column()
  cardExpiry: string;

  @Column()
  cardCVC: string; 

  @Column()
  amount: number;

  @ManyToOne(() => Package, pkg => pkg.id, { eager: false })
  @JoinColumn({ name: 'packageId' })
  package: Package;

  @Column()
  packageId: number;
}
