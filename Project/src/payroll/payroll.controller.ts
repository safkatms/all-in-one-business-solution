import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ValidationPipe } from '@nestjs/common';
import { PayrollService } from './payroll.service';
import { CreatePayrollDto } from './dto/create-payroll.dto';
import { UpdatePayrollDto } from './dto/update-payroll.dto';
import { RoleGuard } from 'src/guards/role.guard';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { SetSchemaGuard } from 'src/guards/schema.guard';
import { ApiTags, ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { Payroll } from './entities/payroll.entity';

@ApiTags('Payroll')
@ApiBearerAuth('access-token')
@Controller('payroll')
@UseGuards(JwtAuthGuard, SetSchemaGuard, new RoleGuard(['owner', 'hr']))
export class PayrollController {
  constructor(private readonly payrollService: PayrollService) {}

  @Post('/create')
  @ApiOperation({ summary: 'Create payroll record' })
  @ApiResponse({ status: 201, description: 'The payroll record has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiBody({ type: CreatePayrollDto })
  createPayroll(@Body(new ValidationPipe()) createPayrollDto: CreatePayrollDto) {
    return this.payrollService.create(createPayrollDto);
  }

  @Get('/records')
  @ApiOperation({ summary: 'Get all payroll records' })
  @ApiResponse({ status: 200, description: 'Return all payroll records.' })
  getAllPayroll() {
    return this.payrollService.findAll();
  }

  @Patch('/update/:employeeId/:payrollMonth')
  @ApiOperation({ summary: 'Update payroll status' })
  @ApiResponse({ status: 200, description: 'The payroll status has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Not found.' })
  @ApiParam({ name: 'employeeId', type: 'number', description: 'Employee ID' })
  @ApiParam({ name: 'payrollMonth', type: 'string', description: 'Payroll month in YYYY-MM format' })
  @ApiBody({ type: UpdatePayrollDto })
  async updatePayrollStatus(
    @Param('employeeId') employeeId: number,
    @Param('payrollMonth') payrollMonth: string,
    @Body(new ValidationPipe()) updatePayrollDto: UpdatePayrollDto
  ): Promise<Payroll> {
    return this.payrollService.update(employeeId, payrollMonth, updatePayrollDto);
  }
}
