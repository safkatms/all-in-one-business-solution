import { IsNotEmpty, IsEmail, IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; // Add this line

export class CreateCustomerDto {
    @ApiProperty({ example: 'John Doe' }) // Add this line
    @IsNotEmpty({ message: 'Name is required' })
    @IsString({ message: 'Name must be a string' })
    @Matches(/^[A-Z][a-z]*$/, { message: 'Name must start with a capital letter and contain no numbers or special characters.' })
    name: string;

    @ApiProperty({ example: '01712345678' }) // Add this line
    @IsNotEmpty()
    @IsString()
    @Matches(/^01[3-9]\d{8}$/, { message: 'Contact must be a valid Bangladesh number.' })
    contact: string;

    @ApiProperty({ example: 'example@example.com' }) // Add this line
    @IsEmail()
    email: string;
}
