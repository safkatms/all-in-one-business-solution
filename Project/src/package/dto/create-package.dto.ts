import { IsNotEmpty, IsEnum } from 'class-validator';

enum PackageName {
  STANDARD = 'standard',
  PREMIUM = 'premium',
}

export class CreatePackageDto {
  @IsEnum(PackageName, { message: 'Name must be either "standard" or "premium"' })
  name: PackageName;
}
