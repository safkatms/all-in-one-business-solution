import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class CreateInventoryManagementDto {
  @IsNotEmpty({ message: 'empty value. product Name cannot be empty' })
  @Length(2)
  @IsString()
  productName: string;
  @Length(2)
  @IsNotEmpty({ message: 'empty value. product details cannot be empty' })
  @IsString()
  productDetails: string;
  @IsNotEmpty({
    message: 'empty value. product purchase price cannot be empty',
  })
  @IsNumber()
  productPurchasePrice: number;
  @IsNotEmpty({ message: 'empty value. sell price cannot be empty' })
  @IsNumber()
  productSellPrice: number;
  @IsNotEmpty({ message: 'empty value. Brand cannot be empty' })
  @IsString()
  porductBrand: string;
  @IsNotEmpty({ message: 'empty value. product quantity cannot be empty' })
  @IsNumber()
  productQuantity: number;
}
