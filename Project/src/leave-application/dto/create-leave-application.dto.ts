import { IsDateString, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLeaveApplicationDto {
  @ApiProperty({ description: 'The start date of the leave application in ISO string format.' })
  @IsNotEmpty()
  @IsDateString()
  startDate: string;

  @ApiProperty({ description: 'The end date of the leave application in ISO string format.' })
  @IsNotEmpty()
  @IsDateString()
  endDate: string;

  @ApiProperty({ description: 'Description of the leave application.' })
  @IsNotEmpty()
  @IsString()
  description: string;
}
