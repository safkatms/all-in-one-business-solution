import { Employee } from 'src/employee/entities/employee.entity';
export declare class Payroll {
    payrollId: number;
    employee: Employee;
    salary: number;
    bonus: number;
    payrollMonth: string;
    status: string;
}
