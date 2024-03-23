import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Req, ValidationPipe } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { SetSchemaGuard } from 'src/guards/schema.guard';

@Controller('employee')
@UseGuards(JwtAuthGuard)
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post('/registration')
  async register(@Body(ValidationPipe) createEmployeeDto: CreateEmployeeDto, @Req() req: any): Promise<void> {
    const { company, packageId } = req.user;
    return this.employeeService.registerEmployee(createEmployeeDto, company, packageId);
  }

  @Get()
  @UseGuards(SetSchemaGuard)
  async findAll(
    @Request() req
  ) {
    return this.employeeService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.employeeService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
  //   return this.employeeService.update(+id, updateEmployeeDto);
  // }

  @Delete('/remove/:id')
  @UseGuards(SetSchemaGuard)
  remove(@Param('id') id: string ,@Request() req) {
    const company =req.company;
    return this.employeeService.remove(+id,company);
  }
}
