
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from 'src/customer/entities/customer.entity';
import { CreateCustomerDto } from 'src/customer/dto/create-customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customersRepository: Repository<Customer>,
  ) {}

  async createCustomerProfile(createCustomerDto: CreateCustomerDto): Promise<any> {
    const existingCustomer = await this.customersRepository.findOne({
      where: { contact: createCustomerDto.contact },
    });

    if (existingCustomer){
      throw new ConflictException('Customer already exist with this number');
    }
    const customer = this.customersRepository.create(createCustomerDto);
    await this.customersRepository.save(customer);

    return {message:"Customer registration successful."};
  }

  async findAll(): Promise<Customer[]> {
    const customers = this.customersRepository.find();
    return customers;
  }

  async findOne(contact: string): Promise<Customer> {
    const customer = await this.customersRepository.findOneBy({ contact });
    if (!customer) {
      throw new NotFoundException(`Customer with contact ${contact} not found`);
    }
    return customer;
  }

}
