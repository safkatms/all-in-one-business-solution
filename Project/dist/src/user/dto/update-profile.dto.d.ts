declare enum Gender {
    MALE = "male",
    FEMALE = "female",
    OTHER = "other"
}
export declare class UpdateProfileDto {
    firstName: string;
    lastName: string;
    mobileNo: string;
    gender: Gender;
    profilePicture?: string;
}
export {};
