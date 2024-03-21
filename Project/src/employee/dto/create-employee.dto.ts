 import { Type } from 'class-transformer';
import { IsDate, IsDateString, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Matches, MinLength } from 'class-validator';

enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

enum UserType {
  HR = 'hr',
  ACCOUNTANT = 'accountant',
  INVENTORY_MANAGER = 'inventory_manager',
  SALESMAN = 'salesman',
}

export class CreateEmployeeDto {
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

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^01[3-9]\d{8}$/, { message: 'Mobile number must be a valid Bangladesh number.' })
  mobileNo: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;'<>,.?\/\\~`\-]).*$/, { message: 'Password must be at least 6 characters long, include at least one uppercase letter, one number, and one special character.' })
  password: string;

  @IsNotEmpty()
  @IsEnum(Gender)
  gender: Gender;

  @IsNotEmpty()
  @IsEnum(UserType)
  userType: UserType;

  @IsNotEmpty()
  @IsNumber()
  employeesalary:number;

  @IsNotEmpty()
  @IsDateString()
  employeejoiningdate:Date;
}
