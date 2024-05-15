import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePayrollDto } from './dto/create-payroll.dto';
import { UpdatePayrollDto } from './dto/update-payroll.dto';
import { Payroll } from './entities/payroll.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from '../employee/entities/employee.entity';

@Injectable()
export class PayrollService {
  constructor(
    @InjectRepository(Payroll)
    private readonly payrollRepository: Repository<Payroll>,
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}
  async create(createPayrollDto: CreatePayrollDto): Promise<Payroll> {
   
    const employee = await this.employeeRepository.findOneBy({ employeeid: createPayrollDto.employeeId });
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${createPayrollDto.employeeId} not found`);
    }
  
    
    const existingPayroll = await this.payrollRepository.findOne({
      where: {
        employee: { employeeid: employee.employeeid },
        payrollMonth: createPayrollDto.payrollMonth,
      },
    });
  
    
    if (existingPayroll) {
      throw new ConflictException(`Payroll for employee ID ${createPayrollDto.employeeId} and month ${createPayrollDto.payrollMonth} already exists`);
    }
  
    
    const payroll = this.payrollRepository.create({
      employee,
      salary: employee.employeesalary,
      bonus: createPayrollDto.bonus || 0, 
      payrollMonth: createPayrollDto.payrollMonth,
      status: createPayrollDto.status,
    });
  

    await this.payrollRepository.save(payroll);
    return payroll;
  }
  


  findAll() : Promise<Payroll[]> {
    return this.payrollRepository.find({
      relations: ['employee'],
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} payroll`;
  }

  async update(employeeId: number, payrollMonth: string, updatePayrollDto: UpdatePayrollDto): Promise<Payroll> {
    const payroll = await this.payrollRepository.findOne({
      where: {
        employee: { employeeid: employeeId },
        payrollMonth,
      },
      relations: ['employee'],
    });

    if (!payroll) {
      throw new NotFoundException(`Payroll record not found for Employee ID ${employeeId} and month ${payrollMonth}`);
    }

    if (updatePayrollDto.bonus !== undefined) {
      payroll.bonus = updatePayrollDto.bonus;
    }
    
    if (updatePayrollDto.status !== undefined) {
      payroll.status = updatePayrollDto.status;
    }

    await this.payrollRepository.save(payroll);
    return payroll;
  }



  remove(id: number) {
    return `This action removes a #${id} payroll`;
  }
}
