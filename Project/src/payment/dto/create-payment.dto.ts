import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty({ description: 'Card number (16 to 19 digits)', minLength: 16, maxLength: 19 })
  @IsString()
  @IsNotEmpty()
  @Length(16, 19, { message: 'Card number must be between 16 and 19 characters' })
  readonly cardNumber: string;

  @ApiProperty({ description: 'Card expiry date (MM/YYYY)' })
  @IsString()
  @IsNotEmpty()
  readonly cardExpiry: string;

  @ApiProperty({ description: 'Card CVC (3 digits)' })
  @IsString()
  @IsNotEmpty()
  @Length(3, 3, { message: 'Card CVC must be 3 characters' })
  readonly cardCVC: string;
}
