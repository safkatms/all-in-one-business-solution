import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum PayrollStatus {
  Paid = 'paid',
  Unpaid = 'unpaid',
}

export class CreatePayrollDto {
  @ApiProperty({ 
    description: 'Employee ID', 
    type: Number, 
    example: 1 
  })
  @IsNotEmpty({ message: 'Employee ID is required' })
  @IsNumber({}, { message: 'Employee ID must be a number' })
  employeeId: number;

  @ApiProperty({ 
    description: 'Bonus amount (optional)', 
    type: Number, 
    example: 500 
  })
  @IsOptional()
  @IsNumber({}, { message: 'Bonus must be a number' })
  bonus?: number;

  @ApiProperty({ 
    description: 'Payroll month in YYYY-MM format', 
    example: '2023-01' 
  })
  @IsNotEmpty({ message: 'Payroll month is required' })
  @IsString({ message: 'Payroll month must be a string' })
  @Matches(/^\d{4}-\d{2}$/, { message: 'Payroll month must be in YYYY-MM format' })
  payrollMonth: string;

  @ApiProperty({ 
    description: 'Payroll status (Paid or Unpaid)', 
    enum: PayrollStatus,
    example: PayrollStatus.Paid 
  })
  @IsNotEmpty({ message: 'Status is required' })
  @IsEnum(PayrollStatus, { message: 'Status must be either "Paid" or "Unpaid"' })
  status: PayrollStatus;
}
