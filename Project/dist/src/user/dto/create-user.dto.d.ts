declare enum Gender {
    MALE = "male",
    FEMALE = "female",
    OTHER = "other"
}
declare enum UserType {
    ADMIN = "admin",
    OWNER = "owner",
    HR = "hr",
    ACCOUNTANT = "accountant",
    INVENTORY_MANAGER = "inventory_manager",
    SALESMAN = "salesman"
}
export declare class CreateUserDto {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    mobileNo: string;
    password: string;
    company: string;
    gender: Gender;
    profilePicture?: string;
    userType: UserType;
}
export {};
