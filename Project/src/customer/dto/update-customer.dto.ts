import {
  IsEmail,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export class UpdateCustomerDto {
  @IsOptional()
  @IsString({ message: 'Name must be a string' })
  @Matches(/^[A-Z][a-z]*$/, {
    message:
      'Name must start with a capital letter and contain no numbers or special characters.',
  })
  name: string;

  @IsOptional()
  @IsString()
  @Matches(/^01[3-9]\d{8}$/, {
    message: 'Contact must be a valid Bangladesh number.',
  })
  contact: string;

  @IsOptional()
  @IsEmail()
  email: string;
}
