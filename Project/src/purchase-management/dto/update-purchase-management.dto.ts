import { PartialType } from '@nestjs/mapped-types';
import { CreatePurchaseManagementDto } from './create-purchase-management.dto';

export class UpdatePurchaseManagementDto extends PartialType(
  CreatePurchaseManagementDto,
) {}
