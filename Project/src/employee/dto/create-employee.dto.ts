import { ApiProperty } from '@nestjs/swagger';
import { 
  IsDate, IsDateString, IsEmail, IsEnum, IsNotEmpty, 
  IsNumber, IsOptional, IsString, Matches, MinLength 
} from 'class-validator';

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
  @ApiProperty({ example: 'John', description: 'First name of the employee' })
  @IsNotEmpty()
  @IsString()
  @Matches(/^[A-Z][a-z]*$/, { message: 'First name must start with a capital letter and contain no numbers or special characters.' })
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'Last name of the employee' })
  @IsNotEmpty()
  @IsString()
  @Matches(/^[A-Z][a-z]*$/, { message: 'Last name must start with a capital letter and contain no numbers or special characters.' })
  lastName: string;

  @ApiProperty({ example: 'johndoe', description: 'Username for the employee account' })
  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-z0-9_]+$/, { message: 'Username must be lowercase, may include underscores and numbers, but no spaces or special characters.' })
  username: string;

  @ApiProperty({ example: 'john.doe@example.com', description: 'Email address of the employee' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: '01712345678', description: 'Mobile number of the employee' })
  @IsNotEmpty()
  @IsString()
  @Matches(/^01[3-9]\d{8}$/, { message: 'Mobile number must be a valid Bangladesh number.' })
  mobileNo: string;

  @ApiProperty({ example: 'Pass123$', description: 'Password for the employee account' })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;'<>,.?\/\\~`\-]).*$/, { message: 'Password must be at least 6 characters long, include at least one uppercase letter, one number, and one special character.' })
  password: string;

  @ApiProperty({ enum: Gender, description: 'Gender of the employee' })
  @IsNotEmpty()
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty({ enum: UserType, description: 'User type of the employee' })
  @IsNotEmpty()
  @IsEnum(UserType)
  userType: UserType;

  @ApiProperty({ example: 50000, description: 'Salary of the employee' })
  @IsNotEmpty()
  @IsNumber()
  employeesalary: number;

  @ApiProperty({ example: '2023-01-01', description: 'Joining date of the employee' })
  @IsNotEmpty()
  @IsDateString()
  employeejoiningdate: Date;
}
