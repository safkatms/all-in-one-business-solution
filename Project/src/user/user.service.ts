import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection, MoreThan } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private connection: Connection,
  ) {}

  async registerUser(createUserDto: CreateUserDto): Promise<any> {
    const { username, email, password, company } = createUserDto;

    const existingUser = await this.usersRepository.findOne({
      where: [{ username }, { email }],
    });

    if (existingUser) {
      throw new ConflictException(
        'User already registered with given username or email',
      );
    }

    const existingCompany = await this.usersRepository.findOne({
      where: [{ company }],
    });

    if (existingCompany) {
      throw new ConflictException(
        'User already registered with given company name',
      );
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

    return { massege: 'Registation successful.' };
  }

  private async createSchemaForUser(company: string): Promise<void> {
    const schemaName = `${company}`;

    //create schema for separate company
    await this.connection.query(`CREATE SCHEMA IF NOT EXISTS "${schemaName}"`);

    //create employee table for separate company
    await this.connection.query(`
    CREATE TABLE IF NOT EXISTS "${schemaName}"."employee" (
      "employeeid" SERIAL PRIMARY KEY,
      "userid" INT REFERENCES public."user"("userId") ON DELETE CASCADE ON UPDATE CASCADE,
      "employeesalary" NUMERIC,
      "employeejoiningdate" DATE NOT NULL
    )    
    `);

    //create productInfo table for separate company
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

    //create purchaseInfo table for separate company
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

    await this.connection.query(`
    CREATE TABLE IF NOT EXISTS "${schemaName}"."payroll" (
      "payrollId" SERIAL PRIMARY KEY,
      "employeeId" INT REFERENCES "${schemaName}"."employee"("employeeid") ON DELETE CASCADE ON UPDATE CASCADE,
      "salary" NUMERIC NOT NULL,
      "bonus" NUMERIC DEFAULT 0,
      "payrollMonth" VARCHAR NOT NULL,
      "status" VARCHAR NOT NULL
    )    
`);

    await this.connection.query(`
    CREATE TABLE IF NOT EXISTS "${schemaName}"."customer" (
      "id" SERIAL PRIMARY KEY,
      "name" VARCHAR NOT NULL,
      "contact" VARCHAR NOT NULL,
      "email" VARCHAR NOT NULL
    )    
`);

    await this.connection.query(`
    CREATE TABLE IF NOT EXISTS "${schemaName}"."order" (
      "orderId" SERIAL PRIMARY KEY,
      "soldBy" VARCHAR(255) NOT NULL,
      "customerId" INT NOT NULL,
      "customerContact" VARCHAR(255) NULL,
      "totalPrice" NUMERIC NOT NULL DEFAULT 0,
      "orderStatus" VARCHAR(255) NOT NULL DEFAULT 'pending',
      CONSTRAINT fk_customer
          FOREIGN KEY("customerId") 
          REFERENCES "${schemaName}"."customer"("id")
          ON DELETE CASCADE ON UPDATE CASCADE
    )
`);

    await this.connection.query(`
    CREATE TABLE IF NOT EXISTS "${schemaName}"."orderItem" (
      "orderItemId" SERIAL PRIMARY KEY,
      "orderId" INT NOT NULL,
      "productId" INT NOT NULL,
      "productName" VARCHAR(255) NOT NULL,
      "quantity" INT NOT NULL,
      "price" NUMERIC NOT NULL,
      CONSTRAINT fk_order
          FOREIGN KEY("orderId") 
          REFERENCES "${schemaName}"."order"("orderId")
          ON DELETE CASCADE ON UPDATE CASCADE
    )
`);

    await this.connection.query(`
    CREATE TABLE IF NOT EXISTS "${schemaName}"."leave" (
      "leaveId" SERIAL PRIMARY KEY,
      "userId" INT NOT NULL,
      "startDate" DATE NOT NULL,
      "endDate" DATE NOT NULL,
      "description" VARCHAR(255) NOT NULL,
      "status" VARCHAR(255) NOT NULL DEFAULT 'Pending',
      CONSTRAINT fk_user
          FOREIGN KEY("userId") 
          REFERENCES public."user"("userId")
          ON DELETE CASCADE ON UPDATE CASCADE
    )
`);
  }

  async updateProfile(
    userId: number,
    updateProfileDto: UpdateProfileDto,
  ): Promise<User> {
    await this.usersRepository.update(userId, updateProfileDto);
    return this.usersRepository.findOneBy({ userId });
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.usersRepository.findOneBy({ username });
  }

  async findProfileByUsername(username: string): Promise<User | undefined> {
    return this.usersRepository.findOne({
      where: { username },
      select: [
        'userId',
        'firstName',
        'lastName',
        'email',
        'username',
        'mobileNo',
        'gender',
        'profilePicture',
      ],
    });
  }

  async changePassword(
    userId: number,
    currentPassword: string,
    newPassword: string,
  ): Promise<void> {
    const user = await this.usersRepository.findOneBy({ userId });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const passwordMatches = await bcrypt.compare(
      currentPassword,
      user.password,
    );
    if (!passwordMatches) {
      throw new UnauthorizedException('Current password is incorrect');
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    await this.usersRepository.update(userId, { password: hashedNewPassword });
  }

  async createPasswordResetToken(email: string): Promise<void> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new Error('User not found');
    }

    const token = uuidv4();
    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 1);

    await this.usersRepository.update(user.userId, {
      passwordResetToken: token,
      passwordResetTokenExpires: expiration,
    });
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    const user = await this.usersRepository.findOne({
      where: {
        passwordResetToken: token,
        passwordResetTokenExpires: MoreThan(new Date()),
      },
    });

    if (!user) {
      throw new Error('Invalid or expired password reset token');
    }

    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltOrRounds);

    await this.usersRepository.update(user.userId, {
      password: hashedPassword,
      passwordResetToken: null,
      passwordResetTokenExpires: null,
    });
  }
}
