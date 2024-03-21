import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class CreatePurchaseManagementDto {
  @IsNotEmpty({ message: 'empty value. Vendor Name cannot be empty' })
  @Length(4)
  @IsString()
  @Matches(/^[A-Z][a-z]*$/, {
    message:
      'Vendor name must start with a capital letter and contain no numbers or special characters.',
  })
  vendorName: string;
  @Length(11)
  @IsNotEmpty({ message: 'empty value. Vendor contact cannot be empty' })
  @Matches(/^01[3-9]\d{8}$/, {
    message: 'Mobile number must be a valid.',
  })
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
  @IsPositive({ message: 'Product purchase price must be a positive number' })
  productPurchasePrice: number;
  @IsNotEmpty({ message: 'empty value. Purchase total Price cannot be empty' })
  @IsNumber()
  @IsPositive({
    message: 'Product purchase total price must be a positive number',
  })
  purchaseTotalPrice: number;
  @IsNotEmpty({ message: 'empty value. Date cannot be empty' })
  @IsDate()
  purchaseDate: string;
}
