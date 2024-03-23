import { CreateEmployeeDto } from './dto/create-employee.dto';
import { Repository, Connection } from 'typeorm';
import { Employee } from './entities/employee.entity';
import { User } from 'src/user/entities/user.entity';
export declare class EmployeeService {
    private employeeRepository;
    private usersRepository;
    private connection;
    constructor(employeeRepository: Repository<Employee>, usersRepository: Repository<User>, connection: Connection);
    registerEmployee(createEmployeeDto: CreateEmployeeDto, company: string, packageId: number): Promise<any>;
    findAll(): Promise<Employee[]>;
    remove(id: number, company: string): Promise<{
        message: string;
    }>;
}
