import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('productInfo')
export class InventoryManagement {
  @PrimaryGeneratedColumn()
  productId: number;

  @Column({ nullable: false })
  productName: string;

  @Column({ nullable: false })
  productDetails: string;

  @Column({ nullable: false })
  productPurchasePrice: number;

  @Column({ nullable: false })
  productSellPrice: number;

  @Column({ nullable: false })
  porductBrand: string;

  @Column({ nullable: false })
  productQuantity: number;
}
