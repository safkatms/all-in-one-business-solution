import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Matches, MinLength } from 'class-validator';

enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export class UpdateProfileDto {
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    @Matches(/^[A-Z][a-z]*$/, { message: 'First name must start with a capital letter and contain no numbers or special characters.' })
    firstName: string;
  
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    @Matches(/^[A-Z][a-z]*$/, { message: 'Last name must start with a capital letter and contain no numbers or special characters.' })
    lastName: string;
  
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    @Matches(/^01[3-9]\d{8}$/, { message: 'Mobile number must be a valid Bangladesh number.' })
    mobileNo: string;
  
    @IsEnum(Gender)
    @IsOptional()
    gender: Gender;
  
    @IsString()
    @IsOptional()
    profilePicture?: string;
}
