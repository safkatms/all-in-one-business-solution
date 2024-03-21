import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { PurchaseManagementService } from './purchase-management.service';
import { CreatePurchaseManagementDto } from './dto/create-purchase-management.dto';
import { UpdatePurchaseManagementDto } from './dto/update-purchase-management.dto';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { SetSchemaGuard } from 'src/guards/schema.guard';
import { RoleGuard } from 'src/guards/role.guard';

@Controller('purchase-management')
@UseGuards(
  JwtAuthGuard,
  SetSchemaGuard,
  new RoleGuard(['inventory_manager', 'owner']),
)
export class PurchaseManagementController {
  constructor(
    private readonly purchaseManagementService: PurchaseManagementService,
  ) {}
  @Post()
  create(
    @Body(ValidationPipe)
    createPurchaseManagementDto: CreatePurchaseManagementDto,
  ) {
    return this.purchaseManagementService.insertPurchase(
      createPurchaseManagementDto,
    );
  }
  @Get()
  findAll() {
    return this.purchaseManagementService.findAllPurchaseDetails();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.purchaseManagementService.findPurchaseById(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(ValidationPipe)
    updatePurchaseManagementDto: UpdatePurchaseManagementDto,
  ) {
    return this.purchaseManagementService.modifyPurchaseInfo(
      +id,
      updatePurchaseManagementDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.purchaseManagementService.remove(+id);
  }
}
