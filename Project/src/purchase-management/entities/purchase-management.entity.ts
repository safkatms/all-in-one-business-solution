import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('purchaseInfo')
export class PurchaseManagement {
  @PrimaryGeneratedColumn()
  purchaseId: number;

  @Column({ nullable: false })
  vendorName: string;

  @Column({ nullable: false })
  vendorContact: string;

  @Column({ nullable: false })
  vendorEmail: string;

  @Column({ nullable: false })
  productName: string;

  @Column({ nullable: false })
  productQuantity: number;

  @Column({ nullable: false })
  productPurchasePrice: number;

  @Column({ nullable: false })
  purchaseTotalPrice: number;

  @Column({ nullable: false })
  purchaseDate: string;
}
