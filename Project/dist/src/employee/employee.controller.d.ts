import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
export declare class EmployeeController {
    private readonly employeeService;
    constructor(employeeService: EmployeeService);
    register(createEmployeeDto: CreateEmployeeDto, req: any): Promise<void>;
    findAll(req: any): Promise<import("src/employee/entities/employee.entity").Employee[]>;
    findOne(id: string): string;
    update(id: string, updateEmployeeDto: UpdateEmployeeDto): string;
    remove(id: string, req: any): Promise<{
        message: string;
    }>;
}
