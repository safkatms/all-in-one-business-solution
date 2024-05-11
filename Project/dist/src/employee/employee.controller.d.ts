import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
export declare class EmployeeController {
    private readonly employeeService;
    constructor(employeeService: EmployeeService);
    register(createEmployeeDto: CreateEmployeeDto, req: any): Promise<void>;
    findAll(req: any): Promise<import("./entities/employee.entity").Employee[]>;
    remove(id: string, req: any): Promise<{
        message: string;
    }>;
}
