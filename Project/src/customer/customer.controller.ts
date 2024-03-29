import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UseGuards } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { SetSchemaGuard } from 'src/guards/schema.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { ApiTags, ApiBearerAuth, ApiOkResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiBadRequestResponse, ApiOperation } from '@nestjs/swagger';

@ApiTags('Customer')
@Controller('customer')
@UseGuards(JwtAuthGuard, SetSchemaGuard, new RoleGuard(['owner', 'salesman']))
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @ApiBearerAuth('access-token')
  @ApiCreatedResponse({ description: 'The customer has been successfully created.' })
  @ApiOperation({ summary: 'Create a new customer profile' })
  @Post('/create')
  async createCustomerProfile(@Body(ValidationPipe) createCustomerDto: CreateCustomerDto) {
    return this.customerService.createCustomerProfile(createCustomerDto);
  }

  @ApiBearerAuth('access-token')
  @ApiOkResponse({ description: 'List of all customers.' })
  @ApiOperation({ summary: 'List of all customers' })
  @Get()
  findAll() {
    return this.customerService.findAll();
  }

  @ApiBearerAuth('access-token')
  @ApiOkResponse({ description: 'Customer found successfully.' })
  @ApiNotFoundResponse({ description: 'Customer not found.' })
  @ApiOperation({ summary: 'Find a customer by contact number' })
  @Get('/:contact')
  findOne(@Param('contact') contact: string) {
    return this.customerService.findOne(contact);
  }

  @ApiBearerAuth('access-token')
  @ApiOkResponse({ description: 'Customer updated successfully.' })
  @ApiBadRequestResponse({ description: 'Bad request, invalid data provided.' })
  @ApiOperation({ summary: 'Update a customer profile by contact number' })
  @Patch('/update/:contact')
  async updateCustomer(@Param('contact') contact: string, @Body() updateCustomerDto: UpdateCustomerDto) {
    return this.customerService.updateCustomer(contact, updateCustomerDto);
  }
}
