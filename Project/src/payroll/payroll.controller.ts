import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PayrollService } from './payroll.service';
import { CreatePayrollDto } from './dto/create-payroll.dto';
import { UpdatePayrollDto } from './dto/update-payroll.dto';
import { RoleGuard } from 'src/guards/role.guard';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { Payroll } from './entities/payroll.entity';
import { SetSchemaGuard } from 'src/guards/schema.guard';
import { ApiTags, ApiBearerAuth, ApiBody } from '@nestjs/swagger';

@Controller('payroll')
@UseGuards(JwtAuthGuard, SetSchemaGuard, new RoleGuard(['owner', 'hr']))
@ApiTags('Payroll')
@ApiBearerAuth('access-token')
export class PayrollController {
  constructor(private readonly payrollService: PayrollService) { }

  @Post('/create')
  @ApiBody({ type: CreatePayrollDto })
  createPayroll(@Body() createPayrollDto: CreatePayrollDto) {
    return this.payrollService.create(createPayrollDto);
  }

  @Get('/records')
  getAllPayroll() {
    return this.payrollService.findAll();
  }

  @Patch('/update/:employeeId/:payrollMonth')
  @ApiBody({ type: UpdatePayrollDto })
  async updatePayrollStatus(
    @Param('employeeId') employeeId: number,
    @Param('payrollMonth') payrollMonth: string,
    @Body() updatePayrollDto: UpdatePayrollDto
  ): Promise<Payroll> {
    return this.payrollService.update(employeeId, payrollMonth, updatePayrollDto);
  }
}
