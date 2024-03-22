import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Min, Validate } from 'class-validator';

export class AddOrderItemDto {
  @IsOptional()
  @IsInt({ message: 'productId must be an integer' })
  productId?: number;

  @IsOptional()
  @IsString({ message: 'productName must be a string' })
  productName?: string;

  @IsNotEmpty({ message: 'Quantity cannot be empty' })
  @IsNumber({}, { message: 'Quantity must be a number' })
  @Min(1, { message: 'Quantity must be at least 1' })
  quantity: number;

}
