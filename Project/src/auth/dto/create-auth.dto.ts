import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthDto {
  @ApiProperty({
    description: 'The username of the user',
    example: 'john_doe',
  })
  @IsString({ message: 'The username must be a string' })
  @IsNotEmpty({ message: 'The username is required and cannot be empty' })
  readonly username: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'password123',
  })
  @IsString({ message: 'The password must be a string' })
  @IsNotEmpty({ message: 'The password is required and cannot be empty' })
  readonly password: string;
}
