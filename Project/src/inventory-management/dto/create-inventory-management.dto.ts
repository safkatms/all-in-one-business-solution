import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  IsPositive,
  Min,
  IsInt,
  Matches,
} from 'class-validator';

export class CreateInventoryManagementDto {
  @ApiProperty({ description: 'Name of the product', example: 'Nimbus2000' })
  @IsNotEmpty({ message: 'Product name cannot be empty' })
  @IsString({ message: 'Product name must be a string' })
  @Length(2, 50, {
    message: 'Product name must be between 2 and 50 characters',
  })
  @Matches(/^[A-Z][a-zA-Z0-9]*$/, {
    message:
      'Product name must start with a capital letter and no special characters.',
  })
  productName: string;

  @ApiProperty({
    description: 'Details of the product',
    example: 'Nimbus 2000 is Faster than Nimbus 1000 Details',
  })
  @IsNotEmpty({ message: 'Product details cannot be empty' })
  @IsString({ message: 'Product details must be a string' })
  @Length(2, 255, {
    message: 'Product details must be between 2 and 255 characters',
  })
  productDetails: string;

  @ApiProperty({ description: 'Purchase price of the product', example: 100 })
  @IsNotEmpty({ message: 'Product purchase price cannot be empty' })
  @IsNumber({}, { message: 'Product purchase price must be a number' })
  @IsPositive({ message: 'Product purchase price must be a positive number' })
  productPurchasePrice: number;

  @ApiProperty({ description: 'Sell price of the product', example: 150 })
  @IsNotEmpty({ message: 'Product sell price cannot be empty' })
  @IsNumber({}, { message: 'Product sell price must be a number' })
  @IsPositive({ message: 'Product sell price must be a positive number' })
  productSellPrice: number;

  @ApiProperty({ description: 'Brand of the product', example: 'NimbusFly' })
  @IsNotEmpty({ message: 'Brand cannot be empty' })
  @IsString({ message: 'Brand must be a string' })
  @Length(2, 20, { message: 'Brand must be between 2 and 20 characters' })
  porductBrand: string;

  @ApiProperty({ description: 'Quantity of the product', example: 100 })
  @IsNotEmpty({ message: 'Product quantity cannot be empty' })
  @IsNumber({}, { message: 'Product quantity must be a number' })
  @Min(0, { message: 'Product quantity cannot be negative' })
  @IsInt({ message: 'Product quantity must be an integer' })
  productQuantity: number;
}
