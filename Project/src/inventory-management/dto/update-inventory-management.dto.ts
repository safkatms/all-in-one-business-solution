import { PartialType } from '@nestjs/mapped-types';
import { CreateInventoryManagementDto } from './create-inventory-management.dto';

export class UpdateInventoryManagementDto extends PartialType(
  CreateInventoryManagementDto,
) {}
