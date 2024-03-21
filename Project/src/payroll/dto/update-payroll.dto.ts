import { PartialType } from '@nestjs/mapped-types';
import { CreatePayrollDto, PayrollStatus } from './create-payroll.dto';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';

export class UpdatePayrollDto {
    @IsOptional()
    @IsNumber()
    bonus?: number;
  
    @IsOptional()
    @IsEnum(PayrollStatus)
    status?: PayrollStatus;
  }
  
