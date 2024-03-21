import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { PayrollStatus } from './create-payroll.dto';

export class UpdatePayrollDto {
  @IsOptional()
  @IsNumber({}, { message: 'Bonus must be a number if provided' })
  bonus?: number;

  @IsOptional()
  @IsEnum(PayrollStatus, { message: 'Status must be either "Paid" or "Unpaid" if provided' })
  status?: PayrollStatus;
}
