import { ConflictException, Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm'; 
import { Employee } from './entities/employee.entity';
import { User } from 'src/user/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private connection: Connection // Inject Connection here
  ){}

 async registerEmployee(createEmployeeDto: CreateEmployeeDto, company: string, packageId: number): Promise<User> {
  // Validate user input
  const { employeesalary, employeejoiningdate, ...userDto } = createEmployeeDto;
  const { username, email, password } = userDto;
  const formattedJoiningDate = new Date(employeejoiningdate);

  // Check if the user is already registered
  const existingUser = await this.usersRepository.findOne({
    where: [{ username }, { email }],
  });

  if (existingUser) {
    throw new ConflictException('User already registered with given username or email');
  }

  // Hash the password before saving the user
  const saltOrRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltOrRounds);
  userDto.password = hashedPassword;

  // Save user data to User table in public schema
  const newUser = this.usersRepository.create({ ...userDto, company, packageId });
  const savedUser = await this.usersRepository.save(newUser);

  // Switch to the company's schema
  await this.connection.query(`SET search_path TO "${company}"`);

  // Define and save employee data to Employee table in company-specific schema
  const employeeData = { userid: savedUser.userId, employeesalary, employeejoiningdate:formattedJoiningDate };
  await this.connection.getRepository(Employee).save(employeeData);

  return savedUser;
}


  async findAll() {
    const employees=await this.employeeRepository.find();
    return employees;
  }

  findOne(id: number) {
    return `This action returns a #${id} employee`;
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return `This action updates a #${id} employee`;
  }

  remove(id: number) {
    return `This action removes a #${id} employee`;
  }
}
