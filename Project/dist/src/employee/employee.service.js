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
exports.EmployeeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const employee_entity_1 = require("./entities/employee.entity");
const user_entity_1 = require("../user/entities/user.entity");
const bcrypt = require("bcrypt");
let EmployeeService = class EmployeeService {
    constructor(employeeRepository, usersRepository, connection) {
        this.employeeRepository = employeeRepository;
        this.usersRepository = usersRepository;
        this.connection = connection;
    }
    async registerEmployee(createEmployeeDto, company, packageId) {
        const { employeesalary, employeejoiningdate, ...userDto } = createEmployeeDto;
        const { username, email, password } = userDto;
        await this.connection.query(`SET search_path TO "public"`);
        const existingUser = await this.usersRepository.findOne({
            where: [{ username }, { email }],
        });
        if (existingUser) {
            throw new common_1.ConflictException('User already registered with given username or email');
        }
        const saltOrRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltOrRounds);
        userDto.password = hashedPassword;
        const newUser = this.usersRepository.create({ ...userDto, company, packageId });
        const savedUser = await this.usersRepository.save(newUser);
        await this.connection.query(`SET search_path TO "${company}"`);
        const employeeData = { userid: savedUser.userId, employeesalary, employeejoiningdate };
        await this.connection.getRepository(employee_entity_1.Employee).save(employeeData);
        return { message: 'Employee registered successfully' };
    }
    async findAll() {
        const employees = await this.employeeRepository.find();
        return employees;
    }
    async remove(id, company) {
        const employee = await this.employeeRepository.findOneOrFail({ where: { employeeid: id } });
        if (!employee) {
            throw new common_1.NotFoundException(`Employee with ID ${id} not found`);
        }
        await this.employeeRepository.remove(employee);
        await this.connection.query(`SET search_path TO "public"`);
        const user = await this.usersRepository.findOne({ where: { userId: employee.userid } });
        if (!user) {
            throw new common_1.NotFoundException(`User corresponding to employee with ID ${id} not found`);
        }
        await this.usersRepository.remove(user);
        return { message: `Employee with ID ${id} and associated user removed successfully` };
    }
};
exports.EmployeeService = EmployeeService;
exports.EmployeeService = EmployeeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(employee_entity_1.Employee)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Connection])
], EmployeeService);
//# sourceMappingURL=employee.service.js.map