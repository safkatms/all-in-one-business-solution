import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Min, Validate } from 'class-validator';

export class AddOrderItemDto {
  @ApiProperty({ required: false, type: Number, description: 'ID of the product' })
  @IsOptional()
  @IsInt({ message: 'productId must be an integer' })
  productId?: number;

  @ApiProperty({ required: false, type: String, description: 'Name of the product' })
  @IsOptional()
  @IsString({ message: 'productName must be a string' })
  productName?: string;

  @ApiProperty({ type: Number, description: 'Quantity of the product' })
  @IsNotEmpty({ message: 'Quantity cannot be empty' })
  @IsNumber({}, { message: 'Quantity must be a number' })
  @Min(1, { message: 'Quantity must be at least 1' })
  quantity: number;
}
