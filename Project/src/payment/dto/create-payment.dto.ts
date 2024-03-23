import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreatePaymentDto {
  @IsString()
  @IsNotEmpty()
  @Length(16, 19)
  readonly cardNumber: string;

  @IsString()
  @IsNotEmpty()
  readonly cardExpiry: string;

  @IsString()
  @IsNotEmpty()
  @Length(3)
  readonly cardCVC: string;
}
