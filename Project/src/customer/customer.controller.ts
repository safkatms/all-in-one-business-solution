import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UseGuards } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { SetSchemaGuard } from 'src/guards/schema.guard';
import { RoleGuard } from 'src/guards/role.guard';

@Controller('customer')
@UseGuards(JwtAuthGuard,SetSchemaGuard,new RoleGuard(['owner','salesman']))
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post('/create')
  async createCustomerProfile(@Body(ValidationPipe) createCustomerDto: CreateCustomerDto) {
    return this.customerService.createCustomerProfile(createCustomerDto);
  }

  @Get()
  findAll() {
    return this.customerService.findAll();
  }

  @Get('/:contact')
  findOne(@Param('contact') contact: string) {
    return this.customerService.findOne(contact);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
  //   return this.customerService.update(+id, updateCustomerDto);
  // }

  // Within CustomersController

@Patch('/update/:contact')
async updateCustomer(@Param('contact') contact: string, @Body() updateCustomerDto: UpdateCustomerDto) {
  return this.customerService.updateCustomer(contact, updateCustomerDto);
}


  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.customerService.remove(+id);
  // }
}
