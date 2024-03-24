import { IsEmail, IsEnum, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export class CreateUserDto {
  @ApiProperty({ description: 'First name', example: 'John' })
  @IsNotEmpty()
  @IsString()
  @Matches(/^[A-Z][a-z]*$/, { message: 'First name must start with a capital letter and contain no numbers or special characters.' })
  firstName: string;

  @ApiProperty({ description: 'Last name', example: 'Doe' })
  @IsNotEmpty()
  @IsString()
  @Matches(/^[A-Z][a-z]*$/, { message: 'Last name must start with a capital letter and contain no numbers or special characters.' })
  lastName: string;

  @ApiProperty({ description: 'Username', example: 'johndoe123' })
  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-z0-9_]+$/, { message: 'Username must be lowercase, may include underscores and numbers, but no spaces or special characters.' })
  username: string;

  @ApiProperty({ description: 'Email address', example: 'johndoe@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Mobile number', example: '01712345678' })
  @IsNotEmpty()
  @IsString()
  @Matches(/^01[3-9]\d{8}$/, { message: 'Mobile number must be a valid Bangladesh number.' })
  mobileNo: string;

  @ApiProperty({ description: 'Company', example: 'ACME' })
  @IsNotEmpty()
  @IsString()
  @Matches(/^[A-Z]+$/, { message: 'Company must be all uppercase, with no numbers, spaces, or special characters.' })
  company: string;

  @ApiProperty({ description: 'Gender', enum: Gender, example: Gender.MALE })
  @IsNotEmpty()
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty({ description: 'Password', example: 'Password123!' })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;'<>,.?\/\\~`\-]).*$/, { message: 'Password must be at least 6 characters long, include at least one uppercase letter, one number, and one special character.' })
  password: string;

  @ApiProperty({ description: 'Confirmation of password', example: 'Password123!' })
  @IsNotEmpty()
  @IsString()
  conPassword: string;
}
