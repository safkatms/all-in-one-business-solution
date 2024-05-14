export declare enum PayrollStatus {
    Paid = "Paid",
    Unpaid = "Unpaid"
}
export declare class CreatePayrollDto {
    employeeId: number;
    bonus?: number;
    payrollMonth: string;
    status: PayrollStatus;
}
