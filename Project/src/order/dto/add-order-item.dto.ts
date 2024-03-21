import { IsInt, IsOptional, IsPositive, IsString, Validate } from 'class-validator';

export class AddOrderItemDto {
  @IsOptional()
  @IsInt({ message: 'productId must be an integer' })
  productId?: number;

  @IsOptional()
  @IsString({ message: 'productName must be a string' })
  productName?: string;

  @IsPositive({ message: 'quantity must be a positive number' })
  quantity: number;

}
