import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PayrollStatus } from './create-payroll.dto';

export class UpdatePayrollDto {
  @ApiProperty({ description: 'Bonus amount (optional)', type: Number })
  @IsOptional()
  @IsNumber({}, { message: 'Bonus must be a number if provided' })
  bonus?: number;

  @ApiProperty({ description: 'Payroll status (Paid or Unpaid, optional)', enum: PayrollStatus })
  @IsOptional()
  @IsEnum(PayrollStatus, { message: 'Status must be either "Paid" or "Unpaid" if provided' })
  status?: PayrollStatus;
}
