import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAuthDto {
  @IsString({ message: 'The username must be a string' })
  @IsNotEmpty({ message: 'The username is required and cannot be empty' })
  readonly username: string;

  @IsString({ message: 'The password must be a string' })
  @IsNotEmpty({ message: 'The password is required and cannot be empty' })
  readonly password: string;
}
