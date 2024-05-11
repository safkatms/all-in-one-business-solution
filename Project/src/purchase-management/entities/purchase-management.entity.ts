import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('purchaseInfo')
export class PurchaseManagement {
  @ApiProperty({
    description: 'Unique identifier for the purchase',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  purchaseId: number;

  @ApiProperty({ description: 'Name of the vendor', example: 'Hogwartshop' })
  @Column({ nullable: false })
  vendorName: string;

  @ApiProperty({
    description: 'Contact number of the vendor',
    example: '01234567890',
  })
  @Column({ nullable: false })
  vendorContact: string;

  @ApiProperty({
    description: 'Email of the vendor',
    example: 'hogwart@gmail.com',
  })
  @Column({ nullable: false })
  vendorEmail: string;

  @ApiProperty({
    description: 'Name of the product',
    example: 'Nimbus2000',
  })
  @Column({ nullable: false })
  productName: string;

  @ApiProperty({
    description: 'Quantity of the product purchased',
    example: 10,
  })
  @Column({ nullable: false })
  productQuantity: number;

  @ApiProperty({ description: 'Purchase price of the product', example: 1000 })
  @Column({ nullable: false })
  productPurchasePrice: number;

  @ApiProperty({
    description: 'Total purchase price of the products',
    example: 1500,
  })
  @Column({ nullable: false })
  purchaseTotalPrice: number;

  @ApiProperty({
    description: 'Date of the purchase',
    example: '2024-03-23',
  })
  @Column({ nullable: false })
  purchaseDate: string;
}
