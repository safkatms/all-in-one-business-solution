export declare enum PayrollStatus {
    Paid = "paid",
    Unpaid = "unpaid"
}
export declare class CreatePayrollDto {
    employeeId: number;
    bonus?: number;
    payrollMonth: string;
    status: PayrollStatus;
}
