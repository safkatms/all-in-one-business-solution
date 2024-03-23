import { CreatePayrollDto } from './dto/create-payroll.dto';
import { UpdatePayrollDto } from './dto/update-payroll.dto';
import { Payroll } from './entities/payroll.entity';
import { Repository } from 'typeorm';
import { Employee } from '../employee/entities/employee.entity';
export declare class PayrollService {
    private readonly payrollRepository;
    private readonly employeeRepository;
    constructor(payrollRepository: Repository<Payroll>, employeeRepository: Repository<Employee>);
    create(createPayrollDto: CreatePayrollDto): Promise<Payroll>;
    findAll(): Promise<Payroll[]>;
    findOne(id: number): string;
    update(employeeId: number, payrollMonth: string, updatePayrollDto: UpdatePayrollDto): Promise<Payroll>;
    remove(id: number): string;
}
