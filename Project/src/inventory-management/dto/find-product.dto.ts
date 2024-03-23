import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class FindProductDto {
  @ApiProperty({
    required: false,
    description: 'Name of the product',
    example: 'Smartphone',
  })
  @IsString()
  productName?: string;

  @ApiProperty({
    required: false,
    description: 'Details of the product',
    example: 'High-resolution display, 128GB storage',
  })
  @IsString()
  productDetails?: string;

  @ApiProperty({
    required: false,
    description: 'Purchase price of the product',
    example: 599.99,
  })
  @IsNumber()
  productPurchasePrice?: number;

  @ApiProperty({
    required: false,
    description: 'Sell price of the product',
    example: 799.99,
  })
  @IsNumber()
  productSellPrice?: number;

  @ApiProperty({
    required: false,
    description: 'Brand of the product',
    example: 'Apple',
  })
  @IsString()
  porductBrand?: string;

  @ApiProperty({
    required: false,
    description: 'Quantity of the product',
    example: 100,
  })
  @IsNumber()
  productQuantity?: number;

  search?: string;
}
