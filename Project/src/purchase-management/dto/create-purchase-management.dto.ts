import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class CreatePurchaseManagementDto {
  @ApiProperty({
    description: 'Name of the vendor',
    minLength: 4,
    example: 'Hogwartshop',
  })
  @IsNotEmpty({ message: 'empty value. Vendor Name cannot be empty' })
  @Length(4)
  @IsString()
  @Matches(/^[A-Z][a-z]*$/, {
    message:
      'Vendor name must start with a capital letter and contain no numbers or special characters.',
  })
  vendorName: string;

  @ApiProperty({
    description: 'Contact number of the vendor',
    minLength: 11,
    example: '01734567890',
  })
  @Length(11)
  @IsNotEmpty({ message: 'empty value. Vendor contact cannot be empty' })
  @Matches(/^01[3-9]\d{8}$/, {
    message: 'Mobile number must be a valid.',
  })
  vendorContact: string;

  @ApiProperty({
    description: 'Email of the vendor',
    example: 'hogwarts@gmail.com',
  })
  @IsNotEmpty({ message: 'empty value. Email be empty' })
  @IsString()
  @IsEmail()
  vendorEmail: string;

  @ApiProperty({
    description: 'Name of the product',
    minLength: 4,
    example: 'Nimbus2000',
  })
  @IsNotEmpty({ message: 'empty value. Product Name cannot be empty' })
  @IsString()
  @Length(4)
  productName: string;

  @ApiProperty({
    description: 'Quantity of the product purchased',
    example: 10,
  })
  @IsNotEmpty({ message: 'empty value. Product Quantity cannot be empty' })
  @IsNumber()
  productQuantity: number;

  @ApiProperty({
    description: 'Purchase price of the product',
    example: 1000,
  })
  @IsNotEmpty({
    message: 'empty value. Product Purchase price cannot be empty',
  })
  @IsNumber()
  @IsPositive({ message: 'Product purchase price must be a positive number' })
  productPurchasePrice: number;

  @ApiProperty({
    description: 'Total purchase price of the products',
    example: 1500,
  })
  @IsNotEmpty({ message: 'empty value. Purchase total Price cannot be empty' })
  @IsNumber()
  @IsPositive({
    message: 'Product purchase total price must be a positive number',
  })
  purchaseTotalPrice: number;

  @ApiProperty({
    description: 'Date of the purchase',
    example: '2024-03-23',
  })
  @IsNotEmpty({ message: 'empty value. Date cannot be empty' })
  @IsDateString()
  purchaseDate: string;
}
