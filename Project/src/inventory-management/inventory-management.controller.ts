import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UsePipes,
  UseGuards,
} from '@nestjs/common';
import { InventoryManagementService } from './inventory-management.service';
import { CreateInventoryManagementDto } from './dto/create-inventory-management.dto';
import { UpdateInventoryManagementDto } from './dto/update-inventory-management.dto';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { SetSchemaGuard } from 'src/guards/schema.guard';
import { RoleGuard } from 'src/guards/role.guard';

@Controller('inventory-management')
@UseGuards(
  JwtAuthGuard,
  SetSchemaGuard,
  new RoleGuard(['inventory_manager', 'owner']),
)
export class InventoryManagementController {
  constructor(
    private readonly inventoryManagementService: InventoryManagementService,
  ) {}

  @UsePipes(ValidationPipe)
  @Post('add-item')
  create(@Body() createInventoryManagementDto: CreateInventoryManagementDto) {
    return this.inventoryManagementService.create(createInventoryManagementDto);
  }

  @Get()
  findAll() {
    return this.inventoryManagementService.findAll();
  }
  @Get('by-name/:itemName')
  findByUsername(@Param('itemName') itemName: string) {
    return this.inventoryManagementService.findByItemName(itemName);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inventoryManagementService.findOne(+id);
  }
  @UsePipes(ValidationPipe)
  @Patch('modify-item/:id')
  update(
    @Param('id') id: number,
    @Body() updateInventoryManagementDto: UpdateInventoryManagementDto,
  ) {
    return this.inventoryManagementService.update(
      +id,
      updateInventoryManagementDto,
    );
  }
  @Delete('remove-item/:id')
  remove(@Param('id') id: string) {
    return this.inventoryManagementService.remove(+id);
  }
}
