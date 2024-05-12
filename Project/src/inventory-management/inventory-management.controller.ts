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
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiTags,
  ApiParam,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';

@ApiTags('Inventory Management')
@Controller('inventory-management')
//@UseGuards(
//   JwtAuthGuard,
//SetSchemaGuard,
//   new RoleGuard(['inventory_manager', 'owner']),
//)
export class InventoryManagementController {
  constructor(
    private readonly inventoryManagementService: InventoryManagementService,
  ) {}

  @UsePipes(ValidationPipe)
  @Post('add-item')
  //swagger
  @ApiCreatedResponse({ description: 'Item successfully created.' })
  @ApiBadRequestResponse({ description: 'Bad request. Invalid input.' })
  @ApiConflictResponse({ description: 'Conflict. Item already exists.' })
  @ApiBearerAuth('access-token')
  @ApiBody({ type: CreateInventoryManagementDto })
  //add
  create(@Body() createInventoryManagementDto: CreateInventoryManagementDto) {
    return this.inventoryManagementService.create(createInventoryManagementDto);
  }
  //all data
  @ApiOkResponse({ description: 'List of all items.' })
  @ApiBearerAuth('access-token')
  @Get()
  findAll() {
    return this.inventoryManagementService.findAll();
  }
  //find by name
  @ApiOkResponse({ description: 'Found item by name.' })
  @ApiNotFoundResponse({ description: 'Item not found.' })
  @ApiBearerAuth('access-token')
  @ApiParam({ name: 'itemName', description: 'Name of the item' })
  @Get('by-name/:itemName')
  findByUsername(@Param('itemName') itemName: string) {
    return this.inventoryManagementService.findByItemName(itemName);
  }
  //find by id
  @ApiOkResponse({ description: 'Found item by ID.' })
  @ApiNotFoundResponse({ description: 'Item not found.' })
  @ApiBearerAuth('access-token')
  @ApiParam({ name: 'id', description: 'ID of the item' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inventoryManagementService.findOne(+id);
  }

  //modify
  @UsePipes(ValidationPipe)
  @Patch('modify-item/:id')
  @ApiOkResponse({ description: 'Item successfully updated.' })
  @ApiBadRequestResponse({ description: 'Bad request. Invalid input.' })
  @ApiNotFoundResponse({ description: 'Item not found.' })
  @ApiBearerAuth('access-token')
  @ApiParam({ name: 'id', description: 'ID of the item' })
  @ApiBody({ type: CreateInventoryManagementDto })
  update(
    @Param('id') id: number,
    @Body() updateInventoryManagementDto: UpdateInventoryManagementDto,
  ) {
    return this.inventoryManagementService.update(
      +id,
      updateInventoryManagementDto,
    );
  }
  //delete
  @Delete('remove-item/:id')
  @ApiOkResponse({ description: 'Item successfully deleted.' })
  @ApiNotFoundResponse({ description: 'Item not found.' })
  @ApiBearerAuth('access-token')
  @ApiParam({ name: 'id', description: 'ID of the item' })
  remove(@Param('id') id: string) {
    return this.inventoryManagementService.remove(+id);
  }
}
