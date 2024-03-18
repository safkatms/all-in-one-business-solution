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
    password: string;
    company: string;
    gender: Gender;
    profilePicture?: string;
}
export {};
