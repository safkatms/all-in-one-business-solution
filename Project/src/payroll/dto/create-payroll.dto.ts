import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Matches } from 'class-validator';

export enum PayrollStatus {
  Paid = 'paid',
  Unpaid = 'unpaid',
}

export class CreatePayrollDto {
  @IsNotEmpty()
  @IsNumber()
  employeeId: number;

  @IsOptional()
  @IsNumber()
  bonus?: number;

  @IsNotEmpty()
  @IsString()
  @Matches(/^\d{4}-\d{2}$/, { message: 'payrollMonth must be in YYYY-MM format' })
  payrollMonth: string;

  @IsNotEmpty()
  @IsEnum(PayrollStatus)
  status: PayrollStatus;
}