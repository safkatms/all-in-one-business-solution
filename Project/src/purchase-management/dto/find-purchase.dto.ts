import { IsNumber, IsString } from 'class-validator';

export class FindProductDto {
  @IsString()
  productName?: string;
  @IsString()
  productDetails?: string;
  @IsNumber()
  productPurchasePrice?: number;
  @IsNumber()
  productSellPrice?: number;
  @IsString()
  porductBrand?: string;
  @IsNumber()
  productQuantity?: number;

  search?: string;
}
