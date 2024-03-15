// create-package.dto.ts
import { IsNotEmpty, IsString, IsEnum } from 'class-validator';

enum PackageName {
  STANDARD = 'standard',
  PREMIUM = 'premium',
}

export class CreatePackageDto {
  @IsEnum(PackageName)
  @IsNotEmpty()
  name: PackageName;
}
