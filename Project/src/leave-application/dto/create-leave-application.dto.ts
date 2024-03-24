import { IsDateString, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLeaveApplicationDto {
  @ApiProperty({ 
    description: 'The start date of the leave application in ISO string format.', 
    example: '2023-04-01' 
  })
  @IsNotEmpty()
  @IsDateString()
  startDate: string;

  @ApiProperty({ 
    description: 'The end date of the leave application in ISO string format.', 
    example: '2023-04-10' 
  })
  @IsNotEmpty()
  @IsDateString()
  endDate: string;

  @ApiProperty({ 
    description: 'Description of the leave application.', 
    example: 'Taking annual leave for a family vacation.' 
  })
  @IsNotEmpty()
  @IsString()
  description: string;
}
