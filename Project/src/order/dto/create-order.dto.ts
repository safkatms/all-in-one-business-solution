import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({ description: 'Contact number of the customer. Must be a valid Bangladesh number starting with 013-019.', example: '01712345678' })
  @IsNotEmpty({ message: 'Contact cannot be empty' })
  @IsString({ message: 'Contact must be a string' })
  @Matches(/^01[3-9]\d{8}$/, { message: 'Contact must be a valid Bangladesh number.' })
  customerContact: string;
}
