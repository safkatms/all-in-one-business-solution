import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Matches } from 'class-validator';

export enum PayrollStatus {
  Paid = 'paid',
  Unpaid = 'unpaid',
}

export class CreatePayrollDto {
  @IsNotEmpty({ message: 'Employee ID is required' })
  @IsNumber({}, { message: 'Employee ID must be a number' })
  employeeId: number;

  @IsOptional()
  @IsNumber({}, { message: 'Bonus must be a number' })
  bonus?: number;

  @IsNotEmpty({ message: 'Payroll month is required' })
  @IsString({ message: 'Payroll month must be a string' })
  @Matches(/^\d{4}-\d{2}$/, { message: 'Payroll month must be in YYYY-MM format' })
  payrollMonth: string;

  @IsNotEmpty({ message: 'Status is required' })
  @IsEnum(PayrollStatus, { message: 'Status must be either "Paid" or "Unpaid"' })
  status: PayrollStatus;
}
