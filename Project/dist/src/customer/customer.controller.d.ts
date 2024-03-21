import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
export declare class CustomerController {
    private readonly customerService;
    constructor(customerService: CustomerService);
    createCustomerProfile(createCustomerDto: CreateCustomerDto): Promise<any>;
    findAll(): Promise<import("src/customer/entities/customer.entity").Customer[]>;
    findOne(contact: string): Promise<import("src/customer/entities/customer.entity").Customer>;
}
