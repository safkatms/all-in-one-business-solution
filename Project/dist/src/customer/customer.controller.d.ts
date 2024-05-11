import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
export declare class CustomerController {
    private readonly customerService;
    constructor(customerService: CustomerService);
    createCustomerProfile(createCustomerDto: CreateCustomerDto): Promise<any>;
    findAll(): Promise<import("./entities/customer.entity").Customer[]>;
    findOne(contact: string): Promise<import("./entities/customer.entity").Customer>;
    updateCustomer(contact: string, updateCustomerDto: UpdateCustomerDto): Promise<import("./entities/customer.entity").Customer>;
}
