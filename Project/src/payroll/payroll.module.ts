import { Module } from '@nestjs/common';
import { PayrollService } from './payroll.service';
import { PayrollController } from './payroll.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payroll } from './entities/payroll.entity';
import { Employee } from '../employee/entities/employee.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Payroll,Employee])],
  controllers: [PayrollController],
  providers: [PayrollService],
})
export class PayrollModule {}
