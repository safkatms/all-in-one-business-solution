import { PayrollService } from './payroll.service';
import { CreatePayrollDto } from './dto/create-payroll.dto';
import { UpdatePayrollDto } from './dto/update-payroll.dto';
import { Payroll } from './entities/payroll.entity';
export declare class PayrollController {
    private readonly payrollService;
    constructor(payrollService: PayrollService);
    createPayroll(createPayrollDto: CreatePayrollDto): Promise<Payroll>;
    getAllPayroll(): Promise<Payroll[]>;
    updatePayrollStatus(employeeId: number, payrollMonth: string, updatePayrollDto: UpdatePayrollDto): Promise<Payroll>;
}
