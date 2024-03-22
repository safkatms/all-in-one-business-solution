import { Controller, Get, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { SetSchemaGuard } from 'src/guards/schema.guard';

@Controller('delivery')
@UseGuards(
  JwtAuthGuard,
  SetSchemaGuard,
  new RoleGuard(['inventory_manager', 'owner']),
)
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  @Patch('make-delivery/:id')
  makeDelivery(
    @Param('id') id: string,
    @Body() updateDeliveryDto: UpdateDeliveryDto,
  ) {
    return this.deliveryService.makeDelivery(+id, updateDeliveryDto);
  }

  @Get()
  findAll() {
    return this.deliveryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deliveryService.findOne(+id);
  }

  @Patch('returned-delivery/:id')
  returnDelivery(
    @Param('id') id: string,
    @Body() updateDeliveryDto: UpdateDeliveryDto,
  ) {
    return this.deliveryService.returnedDelivery(+id, updateDeliveryDto);
  }
}
