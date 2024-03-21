import { Repository } from 'typeorm';
import { Customer } from 'src/customer/entities/customer.entity';
import { CreateCustomerDto } from 'src/customer/dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
export declare class CustomerService {
    private customersRepository;
    constructor(customersRepository: Repository<Customer>);
    createCustomerProfile(createCustomerDto: CreateCustomerDto): Promise<any>;
    findAll(): Promise<Customer[]>;
    findOne(contact: string): Promise<Customer>;
    updateCustomer(contact: string, updateCustomerDto: UpdateCustomerDto): Promise<Customer>;
}
