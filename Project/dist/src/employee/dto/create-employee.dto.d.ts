declare enum Gender {
    MALE = "male",
    FEMALE = "female",
    OTHER = "other"
}
declare enum UserType {
    HR = "hr",
    ACCOUNTANT = "accountant",
    INVENTORY_MANAGER = "inventory_manager",
    SALESMAN = "salesman"
}
export declare class CreateEmployeeDto {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    mobileNo: string;
    password: string;
    gender: Gender;
    userType: UserType;
    employeesalary: number;
    employeejoiningdate: Date;
}
export {};
