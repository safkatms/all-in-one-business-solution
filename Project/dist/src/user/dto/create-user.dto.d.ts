declare enum Gender {
    MALE = "male",
    FEMALE = "female",
    OTHER = "other"
}
export declare class CreateUserDto {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    mobileNo: string;
    company: string;
    gender: Gender;
    password: string;
    conPassword: string;
}
export {};
