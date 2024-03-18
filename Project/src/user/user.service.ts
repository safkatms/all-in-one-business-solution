// user.service.ts
import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private connection: Connection,
  ) { }

  async registerUser(createUserDto: CreateUserDto): Promise<User> {
    const { username, email, password, company } = createUserDto;

    // Check if the user is already registered
    const existingUser = await this.usersRepository.findOne({
      where: [{ username }, { email }],
    });

    if (existingUser) {
      throw new ConflictException('User already registered with given username or email');
    }

    const existingCompany = await this.usersRepository.findOne({
      where: [{ company }],
    });

    if (existingCompany) {
      throw new ConflictException('User already registered with given company name');
    }

    // Hash the password before saving the user
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    createUserDto.password = hashedPassword;

    const newUser = this.usersRepository.create(createUserDto);
    const savedUser = await this.usersRepository.save(newUser);

    // Create a schema for the user after successful registration
    await this.createSchemaForUser(savedUser.company);

    return savedUser;
  }

  private async createSchemaForUser(company: string): Promise<void> {
    const schemaName = `${company}`;
    await this.connection.query(`CREATE SCHEMA IF NOT EXISTS "${schemaName}"`);
  
    await this.connection.query(`
    CREATE TABLE IF NOT EXISTS "${schemaName}".Employee (
      employeeId SERIAL PRIMARY KEY,
      userId INT REFERENCES public."user"("userId") ON DELETE CASCADE ON UPDATE CASCADE,
      employeeSalary NUMERIC,
      employeeJoiningDate TIMESTAMP
    )    
    `);
  }
   
  
  async findByUsername(username: string): Promise<User | undefined> {
    return this.usersRepository.findOneBy({ username });
  }
}
