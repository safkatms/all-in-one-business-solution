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
exports.PayrollService = void 0;
const common_1 = require("@nestjs/common");
const payroll_entity_1 = require("./entities/payroll.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const employee_entity_1 = require("../employee/entities/employee.entity");
let PayrollService = class PayrollService {
    constructor(payrollRepository, employeeRepository) {
        this.payrollRepository = payrollRepository;
        this.employeeRepository = employeeRepository;
    }
    async create(createPayrollDto) {
        const employee = await this.employeeRepository.findOneBy({ employeeid: createPayrollDto.employeeId });
        if (!employee) {
            throw new common_1.NotFoundException(`Employee with ID ${createPayrollDto.employeeId} not found`);
        }
        const payroll = this.payrollRepository.create({
            employee,
            salary: employee.employeesalary,
            bonus: createPayrollDto.bonus,
            payrollMonth: createPayrollDto.payrollMonth,
            status: createPayrollDto.status,
        });
        await this.payrollRepository.save(payroll);
        return payroll;
    }
    findAll() {
        return this.payrollRepository.find({
            relations: ['employee'],
        });
    }
    findOne(id) {
        return `This action returns a #${id} payroll`;
    }
    async update(employeeId, payrollMonth, updatePayrollDto) {
        const payroll = await this.payrollRepository.findOne({
            where: {
                employee: { employeeid: employeeId },
                payrollMonth,
            },
            relations: ['employee'],
        });
        if (!payroll) {
            throw new common_1.NotFoundException(`Payroll record not found for Employee ID ${employeeId} and month ${payrollMonth}`);
        }
        if (updatePayrollDto.bonus !== undefined) {
            payroll.bonus = updatePayrollDto.bonus;
        }
        if (updatePayrollDto.status !== undefined) {
            payroll.status = updatePayrollDto.status;
        }
        await this.payrollRepository.save(payroll);
        return payroll;
    }
    remove(id) {
        return `This action removes a #${id} payroll`;
    }
};
exports.PayrollService = PayrollService;
exports.PayrollService = PayrollService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(payroll_entity_1.Payroll)),
    __param(1, (0, typeorm_1.InjectRepository)(employee_entity_1.Employee)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], PayrollService);
//# sourceMappingURL=payroll.service.js.map