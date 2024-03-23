"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const bcrypt = require("bcrypt");
const uuid_1 = require("uuid");
let UserService = class UserService {
    constructor(usersRepository, connection) {
        this.usersRepository = usersRepository;
        this.connection = connection;
    }
    async registerUser(createUserDto) {
        const { username, email, password, company } = createUserDto;
        const existingUser = await this.usersRepository.findOne({
            where: [{ username }, { email }],
        });
        if (existingUser) {
            throw new common_1.ConflictException('User already registered with given username or email');
        }
        const existingCompany = await this.usersRepository.findOne({
            where: [{ company }],
        });
        if (existingCompany) {
            throw new common_1.ConflictException('User already registered with given company name');
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
    async createSchemaForUser(company) {
        const schemaName = `${company}`;
        await this.connection.query(`CREATE SCHEMA IF NOT EXISTS "${schemaName}"`);
        await this.connection.query(`
    CREATE TABLE IF NOT EXISTS "${schemaName}"."employee" (
      "employeeid" SERIAL PRIMARY KEY,
      "userid" INT REFERENCES public."user"("userId") ON DELETE CASCADE ON UPDATE CASCADE,
      "employeesalary" NUMERIC,
      "employeejoiningdate" DATE NOT NULL
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
    async updateProfile(userId, updateProfileDto) {
        await this.usersRepository.update(userId, updateProfileDto);
        return this.usersRepository.findOneBy({ userId });
    }
    async findByUsername(username) {
        return this.usersRepository.findOneBy({ username });
    }
    async findProfileByUsername(username) {
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
    async changePassword(userId, currentPassword, newPassword) {
        const user = await this.usersRepository.findOneBy({ userId });
        if (!user) {
            throw new common_1.UnauthorizedException('User not found');
        }
        const passwordMatches = await bcrypt.compare(currentPassword, user.password);
        if (!passwordMatches) {
            throw new common_1.UnauthorizedException('Current password is incorrect');
        }
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        await this.usersRepository.update(userId, { password: hashedNewPassword });
    }
    async createPasswordResetToken(email) {
        const user = await this.usersRepository.findOne({ where: { email } });
        if (!user) {
            throw new Error('User not found');
        }
        const token = (0, uuid_1.v4)();
        const expiration = new Date();
        expiration.setHours(expiration.getHours() + 1);
        await this.usersRepository.update(user.userId, {
            passwordResetToken: token,
            passwordResetTokenExpires: expiration,
        });
    }
    async resetPassword(token, newPassword) {
        const user = await this.usersRepository.findOne({
            where: {
                passwordResetToken: token,
                passwordResetTokenExpires: (0, typeorm_2.MoreThan)(new Date()),
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
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Connection])
], UserService);
//# sourceMappingURL=user.service.js.map