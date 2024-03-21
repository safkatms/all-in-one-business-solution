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
    // Find the employee by ID
    const employee = await this.employeeRepository.findOneBy({ employeeid: createPayrollDto.employeeId });
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${createPayrollDto.employeeId} not found`);
    }
  
    // Check if payroll for the given month and employee already exists
    const existingPayroll = await this.payrollRepository.findOne({
      where: {
        employee: { employeeid: employee.employeeid },
        payrollMonth: createPayrollDto.payrollMonth,
      },
    });
  
    // If a payroll record already exists for the given month, throw an exception or handle as necessary
    if (existingPayroll) {
      throw new ConflictException(`Payroll for employee ID ${createPayrollDto.employeeId} and month ${createPayrollDto.payrollMonth} already exists`);
    }
  
    // Create a new payroll record if it doesn't exist for the given month
    const payroll = this.payrollRepository.create({
      employee,
      salary: employee.employeesalary,
      bonus: createPayrollDto.bonus || 0, // If bonus is optional, ensure a default value is set
      payrollMonth: createPayrollDto.payrollMonth,
      status: createPayrollDto.status,
    });
  
    // Save the new payroll record
    await this.payrollRepository.save(payroll);
    return payroll;
  }
  


  findAll() : Promise<Payroll[]> {
    return this.payrollRepository.find({
      relations: ['employee'], // Optionally include employee details
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} payroll`;
  }

  async update(employeeId: number, payrollMonth: string, updatePayrollDto: UpdatePayrollDto): Promise<Payroll> {
    const payroll = await this.payrollRepository.findOne({
      where: {
        // Use 'employeeId' directly if it's the name of the column in the database
        // If 'employee.employeeid' is the correct path, make sure your entity relationship is properly configured
        employee: { employeeid: employeeId },
        payrollMonth,
      },
      relations: ['employee'], // This ensures 'employee' is loaded and can be used in the condition
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
