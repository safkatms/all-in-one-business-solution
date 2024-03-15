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
        createUserDto.password = hashedPassword;
        const newUser = this.usersRepository.create(createUserDto);
        const savedUser = await this.usersRepository.save(newUser);
        await this.createSchemaForUser(savedUser.company);
        return savedUser;
    }
    async createSchemaForUser(company) {
        const schemaName = `${company}`;
        await this.connection.query(`CREATE SCHEMA IF NOT EXISTS "${schemaName}"`);
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