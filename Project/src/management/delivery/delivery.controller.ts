import { Controller, Get, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { SetSchemaGuard } from 'src/guards/schema.guard';
import { DeliveryManagementValidIdGuard } from './guard/deliveryManagement.guard';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Delivery Management')
@Controller('delivery')
@UseGuards(
  JwtAuthGuard,
  SetSchemaGuard,
  new RoleGuard(['inventory_manager', 'owner']),
)
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}
  @UseGuards(DeliveryManagementValidIdGuard)
  @Patch('make-delivery/:id')

  //swagger tag
  @ApiOperation({ summary: 'Make delivery' })
  @ApiBearerAuth()
  @ApiParam({ name: 'id', description: 'ID of the delivery' })
  @ApiBody({ type: UpdateDeliveryDto })
  @ApiOkResponse({ description: 'Delivery successfully made.' })
  @ApiBadRequestResponse({ description: 'Bad request. Invalid input.' })
  //func
  makeDelivery(
    @Param('id') id: string,
    @Body() updateDeliveryDto: UpdateDeliveryDto,
  ) {
    return this.deliveryService.makeDelivery(+id, updateDeliveryDto);
  }

  //find by id
  @UseGuards(DeliveryManagementValidIdGuard)
  @Get(':id')
  //swagger tag
  @ApiOperation({ summary: 'Find delivery by ID' })
  @ApiBearerAuth()
  @ApiParam({ name: 'id', description: 'ID of the delivery' })
  @ApiOkResponse({ description: 'Delivery found.' })
  @ApiNotFoundResponse({ description: 'Delivery not found.' })

  //func for find
  findOne(@Param('id') id: string) {
    return this.deliveryService.findOne(+id);
  }

  //returned delivery
  @UseGuards(DeliveryManagementValidIdGuard)
  @Patch('returned-delivery/:id')
  //swagger
  @ApiOperation({ summary: 'Return delivery' })
  @ApiBearerAuth()
  @ApiParam({ name: 'id', description: 'ID of the delivery' })
  @ApiBody({ type: UpdateDeliveryDto })
  @ApiOkResponse({ description: 'Delivery successfully returned.' })
  @ApiBadRequestResponse({ description: 'Bad request. Invalid input.' })

  //func for return
  returnDelivery(
    @Param('id') id: string,
    @Body() updateDeliveryDto: UpdateDeliveryDto,
  ) {
    return this.deliveryService.returnedDelivery(+id, updateDeliveryDto);
  }
}
