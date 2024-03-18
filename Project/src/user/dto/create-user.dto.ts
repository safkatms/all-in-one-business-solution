import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Matches, MinLength } from 'class-validator';

enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Matches(/^[A-Z][a-z]*$/, { message: 'First name must start with a capital letter and contain no numbers or special characters.' })
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[A-Z][a-z]*$/, { message: 'Last name must start with a capital letter and contain no numbers or special characters.' })
  lastName: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-z0-9_]+$/, { message: 'Username must be lowercase, may include underscores and numbers, but no spaces or special characters.' })
  username: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^01[3-9]\d{8}$/, { message: 'Mobile number must be a valid Bangladesh number.' })
  mobileNo: string;

  @IsString()
  @MinLength(6)
  @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;'<>,.?\/\\~`\-]).*$/, { message: 'Password must be at least 6 characters long, include at least one uppercase letter, one number, and one special character.' })
  password: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[A-Z]+$/, { message: 'Company must be all uppercase, with no numbers, spaces, or special characters.' })
  company: string;

  @IsEnum(Gender)
  gender: Gender;

  @IsString()
  @IsOptional()
  profilePicture?: string;

}
