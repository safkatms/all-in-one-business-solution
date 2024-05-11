import { IsNotEmpty, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

enum PackageName {
  STANDARD = 'standard',
  PREMIUM = 'premium',
}

export class CreatePackageDto {
  @ApiProperty({ 
    enum: PackageName, 
    enumName: 'PackageName',
    description: 'The name of the package. Can be either "STANDARD" for a standard package or "PREMIUM" for a premium package.',
    example: PackageName.STANDARD
  }) 
  @IsEnum(PackageName, { message: 'Name must be either "standard" or "premium"' })
  name: PackageName;
}
