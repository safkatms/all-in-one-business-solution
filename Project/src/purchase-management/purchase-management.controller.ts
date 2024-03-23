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
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Purchase Management')
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
  @Post('add-purchase')
  @ApiCreatedResponse({ description: 'Purchase successfully created.' })
  @ApiBadRequestResponse({ description: 'Bad request. Invalid input.' })
  @ApiConflictResponse({ description: 'Conflict. Purchase already exists.' })
  @ApiBearerAuth()
  @ApiBody({ type: CreatePurchaseManagementDto })
  create(
    @Body(ValidationPipe)
    createPurchaseManagementDto: CreatePurchaseManagementDto,
  ) {
    return this.purchaseManagementService.insertPurchase(
      createPurchaseManagementDto,
    );
  }
  @Get()
  @ApiOkResponse({ description: 'List of all purchases.' })
  @ApiBearerAuth()
  findAll() {
    return this.purchaseManagementService.findAllPurchaseDetails();
  }

  @ApiOkResponse({ description: 'Found purchase by ID.' })
  @ApiNotFoundResponse({ description: 'Purchase not found.' })
  @ApiBearerAuth()
  @ApiParam({ name: 'id', description: 'ID of the purchase' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.purchaseManagementService.findPurchaseById(+id);
  }

  @ApiOkResponse({ description: 'Purchase successfully updated.' })
  @ApiBadRequestResponse({ description: 'Bad request. Invalid input.' })
  @ApiNotFoundResponse({ description: 'Purchase not found.' })
  @ApiBearerAuth()
  @ApiParam({ name: 'id', description: 'ID of the purchase' })
  @ApiBody({ type: CreatePurchaseManagementDto })
  @Patch('modify-purchase/:id')
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

  @ApiOkResponse({ description: 'Purchase successfully deleted.' })
  @ApiNotFoundResponse({ description: 'Purchase not found.' })
  @ApiBearerAuth()
  @ApiParam({ name: 'id', description: 'ID of the purchase' })
  @Delete('remove-purchase/:id')
  remove(@Param('id') id: string) {
    return this.purchaseManagementService.remove(+id);
  }
}
