import { IsNotEmpty, IsString, Matches } from "class-validator";

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  @Matches(/^01[3-9]\d{8}$/, { message: 'Contact must be a valid Bangladesh number.' })
  customerContact: string;
}
