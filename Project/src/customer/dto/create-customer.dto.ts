import { IsNotEmpty, IsEmail, IsString, Matches } from 'class-validator';

export class CreateCustomerDto {
    @IsNotEmpty({ message: 'Name is required' })
    @IsString({ message: 'Name must be a string' })
    @Matches(/^[A-Z][a-z]*$/, { message: 'Name must start with a capital letter and contain no numbers or special characters.' })
    name: string;

    @IsNotEmpty()
    @IsString()
    @Matches(/^01[3-9]\d{8}$/, { message: 'Contact must be a valid Bangladesh number.' })
    contact: string;

    @IsEmail()
    email: string;
}
