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

  @IsNotEmpty({ message: 'Product details cannot be empty' })
  @IsString({ message: 'Product details must be a string' })
  @Length(2, 255, {
    message: 'Product details must be between 2 and 255 characters',
  })
  productDetails: string;

  @IsNotEmpty({ message: 'Product purchase price cannot be empty' })
  @IsNumber({}, { message: 'Product purchase price must be a number' })
  @IsPositive({ message: 'Product purchase price must be a positive number' })
  productPurchasePrice: number;

  @IsNotEmpty({ message: 'Product sell price cannot be empty' })
  @IsNumber({}, { message: 'Product sell price must be a number' })
  @IsPositive({ message: 'Product sell price must be a positive number' })
  productSellPrice: number;

  @IsNotEmpty({ message: 'Brand cannot be empty' })
  @IsString({ message: 'Brand must be a string' })
  @Length(2, 20, { message: 'Brand must be between 2 and 20 characters' })
  porductBrand: string;

  @IsNotEmpty({ message: 'Product quantity cannot be empty' })
  @IsNumber({}, { message: 'Product quantity must be a number' })
  @Min(0, { message: 'Product quantity cannot be negative' })
  @IsInt({ message: 'Product quantity must be an integer' })
  productQuantity: number;
}
