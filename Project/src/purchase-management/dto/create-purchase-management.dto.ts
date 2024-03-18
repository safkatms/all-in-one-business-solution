import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';

export class CreatePurchaseManagementDto {
  @IsNotEmpty({ message: 'empty value. Vendor Name cannot be empty' })
  @Length(4)
  @IsString()
  vendorName: string;
  @Length(1)
  @IsNotEmpty({ message: 'empty value. Vendor contact cannot be empty' })
  vendorContact: string;
  @IsNotEmpty({ message: 'empty value. Email be empty' })
  @IsString()
  @IsEmail()
  vendorEmail: string;
  @IsNotEmpty({ message: 'empty value. Product Name cannot be empty' })
  @IsString()
  @Length(4)
  productName: string;
  @IsNotEmpty({ message: 'empty value. Product Quantity cannot be empty' })
  @IsNumber()
  productQuantity: number;
  @IsNotEmpty({
    message: 'empty value. Product Purchase price cannot be empty',
  })
  @IsNumber()
  productPurchasePrice: number;
  @IsNotEmpty({ message: 'empty value. Purchase total Price cannot be empty' })
  @IsNumber()
  purchaseTotalPrice: number;
  @IsNotEmpty({ message: 'empty value. Date cannot be empty' })
  @IsNumber()
  @IsDate()
  purchaseDate: string;
}
