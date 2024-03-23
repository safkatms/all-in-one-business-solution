import { IsEmail, IsOptional, IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; // Add this line

export class UpdateCustomerDto {
  @ApiProperty({ example: 'John Doe', required: false }) // Add this line
  @IsOptional()
  @IsString({ message: 'Name must be a string' })
  @Matches(/^[A-Z][a-z]*$/, {
    message:
      'Name must start with a capital letter and contain no numbers or special characters.',
  })
  name: string;

  @ApiProperty({ example: '01712345678', required: false }) // Add this line
  @IsOptional()
  @IsString()
  @Matches(/^01[3-9]\d{8}$/, {
    message: 'Contact must be a valid Bangladesh number.',
  })
  contact: string;

  @ApiProperty({ example: 'example@example.com', required: false }) // Add this line
  @IsOptional()
  @IsEmail()
  email: string;
}
