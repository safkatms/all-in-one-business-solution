import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class FindPurchaseDto {
  @ApiProperty({
    required: false,
    description: 'Name of the vendor',
    example: 'Hogwartshop ',
  })
  @IsString()
  vendorName?: string;

  @ApiProperty({
    required: false,
    description: 'Contact number of the vendor',
    example: '01234567890',
  })
  @IsString()
  vendorContact?: string;

  @ApiProperty({
    required: false,
    description: 'Email of the vendor',
    example: 'hogwarts@gmail.com',
  })
  @IsString()
  vendorEmail?: string;

  @ApiProperty({
    required: false,
    description: 'Date of the purchase',
    example: '2024-03-23',
  })
  @IsString()
  purchaseDate?: string;

  search?: string;
}
