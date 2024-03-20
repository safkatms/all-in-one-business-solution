import { IsString } from 'class-validator';

export class FindPurchaseDto {
  @IsString()
  vendorName?: string;
  @IsString()
  vendorContact?: string;
  @IsString()
  vendorEmail?: string;
  @IsString()
  purchaseDate?: string;

  search?: string;
}
