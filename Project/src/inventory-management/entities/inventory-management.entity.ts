import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('productInfo')
export class InventoryManagement {
  @ApiProperty({ description: 'ID of the product', example: 1 })
  @PrimaryGeneratedColumn()
  productId: number;

  @ApiProperty({ description: 'Name of the product', example: 'Product Name' })
  @Column({ nullable: false })
  productName: string;

  @ApiProperty({
    description: 'Details of the product',
    example: 'Product Details',
  })
  @Column({ nullable: false })
  productDetails: string;

  @ApiProperty({ description: 'Purchase price of the product', example: 10.5 })
  @Column({ nullable: false })
  productPurchasePrice: number;

  @ApiProperty({ description: 'Sell price of the product', example: 15.0 })
  @Column({ nullable: false })
  productSellPrice: number;

  @ApiProperty({ description: 'Brand of the product', example: 'Brand Name' })
  @Column({ nullable: false })
  porductBrand: string;

  @ApiProperty({ description: 'Quantity of the product', example: 100 })
  @Column({ nullable: false })
  productQuantity: number;
}
