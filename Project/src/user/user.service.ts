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

    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    const newUserDto = {
      ...createUserDto,
      password: hashedPassword,
      userType: 'owner',
    };

    const newUser = this.usersRepository.create(newUserDto);
    const savedUser = await this.usersRepository.save(newUser);

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

    await this.connection.query(`
  CREATE TABLE IF NOT EXISTS "${schemaName}"."productInfo" (
    "productId" SERIAL PRIMARY KEY,
    "productName" VARCHAR NOT NULL,
    "productDetails" TEXT NOT NULL,
    "productPurchasePrice" NUMERIC NOT NULL,
    "productSellPrice" NUMERIC NOT NULL,
    "porductBrand" VARCHAR NOT NULL,
    "productQuantity" INT NOT NULL
  )
`);
    await this.connection.query(`
  CREATE TABLE IF NOT EXISTS "${schemaName}"."purchaseInfo" (
    "purchaseId" SERIAL PRIMARY KEY,
    "vendorName" VARCHAR NOT NULL,
    "vendorContact" VARCHAR NOT NULL,
    "vendorEmail" VARCHAR NOT NULL,
    "productName" VARCHAR NOT NULL,
    "productQuantity" INT NOT NULL,
    "productPurchasePrice" NUMERIC NOT NULL,
    "purchaseTotalPrice" NUMERIC NOT NULL,
    "purchaseDate" DATE NOT NULL
  )
`);

  }


  async findByUsername(username: string): Promise<User | undefined> {
    return this.usersRepository.findOneBy({ username });
  }
}
