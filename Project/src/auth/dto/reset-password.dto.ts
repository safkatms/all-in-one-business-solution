import { IsString, IsNotEmpty, MinLength, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
  @ApiProperty({
    description: 'The token received via email for password reset verification',
    example: '123456abcdef',
  })
  @IsString({ message: 'Token must be a valid string' })
  @IsNotEmpty({ message: 'Token is required' })
  token: string;

  @ApiProperty({
    description: 'The new password for the user account',
    example: 'Password123!',
    minLength: 6,
    pattern: '/^(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+{}\\[\\]:;\'<>,.?\\/\\\\~`\\-]).*$/',
  })
  @IsString({ message: 'Password must be a string' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;'<>,.?\/\\~`\-]).*$/, {
    message: 'Password must include at least one uppercase letter, one number, and one special character.'
  })
  password: string;
}
