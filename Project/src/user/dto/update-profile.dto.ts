import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Matches, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export class UpdateProfileDto {
    @ApiProperty({ description: 'First name (optional)' })
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    @Matches(/^[A-Z][a-z]*$/, { message: 'First name must start with a capital letter and contain no numbers or special characters.' })
    firstName: string;
  
    @ApiProperty({ description: 'Last name (optional)' })
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    @Matches(/^[A-Z][a-z]*$/, { message: 'Last name must start with a capital letter and contain no numbers or special characters.' })
    lastName: string;
  
    @ApiProperty({ description: 'Mobile number (optional)' })
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    @Matches(/^01[3-9]\d{8}$/, { message: 'Mobile number must be a valid Bangladesh number.' })
    mobileNo: string;
  
    @ApiProperty({ description: 'Gender (optional)', enum: Gender })
    @IsEnum(Gender)
    @IsOptional()
    gender: Gender;
}
