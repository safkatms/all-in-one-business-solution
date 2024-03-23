import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
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
    private connection: Connection
  ) { }

  async registerEmployee(createEmployeeDto: CreateEmployeeDto, company: string, packageId: number): Promise<any> {
    const { employeesalary, employeejoiningdate, ...userDto } = createEmployeeDto;
    const { username, email, password } = userDto;

    const existingUser = await this.usersRepository.findOne({
      where: [{ username }, { email }],
    });

    if (existingUser) {
      throw new ConflictException('User already registered with given username or email');
    }

    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    userDto.password = hashedPassword;

    const newUser = this.usersRepository.create({ ...userDto, company, packageId });
    const savedUser = await this.usersRepository.save(newUser);

    await this.connection.query(`SET search_path TO "${company}"`);

    const employeeData = { userid: savedUser.userId, employeesalary, employeejoiningdate};
    await this.connection.getRepository(Employee).save(employeeData);

    return { message: 'Employee registered successfully'};
  }


  async findAll() {
    const employees = await this.employeeRepository.find();
    return employees;
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} employee`;
  // }

  // update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
  //   return `This action updates a #${id} employee`;
  // }

  async remove(id: number, company: string) {
    const employee = await this.employeeRepository.findOneOrFail({ where: { employeeid: id } });
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
    await this.employeeRepository.remove(employee);

    await this.connection.query(`SET search_path TO "public"`);
    const user = await this.usersRepository.findOne({ where: { userId: employee.userid } });
    if (!user) {
      throw new NotFoundException(`User corresponding to employee with ID ${id} not found`);
    }

    await this.usersRepository.remove(user);

    return { message: `Employee with ID ${id} and associated user removed successfully` };
  }

}

