import { IsNotEmpty, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

enum PackageName {
  STANDARD = 'standard',
  PREMIUM = 'premium',
}

export class CreatePackageDto {
  @ApiProperty({ enum: PackageName, enumName: 'PackageName' }) 
  @IsEnum(PackageName, { message: 'Name must be either "standard" or "premium"' })
  name: PackageName;
}
