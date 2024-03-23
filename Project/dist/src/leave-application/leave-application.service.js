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
exports.LeaveApplicationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const leave_application_entity_1 = require("./entities/leave-application.entity");
const user_entity_1 = require("../user/entities/user.entity");
const typeorm_2 = require("typeorm");
let LeaveApplicationService = class LeaveApplicationService {
    constructor(leaveRepository, userRepository, connection) {
        this.leaveRepository = leaveRepository;
        this.userRepository = userRepository;
        this.connection = connection;
    }
    async createLeaveApplication(userId, createLeaveDto) {
        const user = await this.userRepository.findOneBy({ userId });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${userId} not found`);
        }
        const startDate = new Date(createLeaveDto.startDate);
        const endDate = new Date(createLeaveDto.endDate);
        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            throw new Error('Invalid startDate or endDate');
        }
        const overlappingLeave = await this.leaveRepository.findOne({
            where: {
                user: user,
                startDate: (0, typeorm_2.LessThanOrEqual)(endDate),
                endDate: (0, typeorm_2.MoreThanOrEqual)(startDate),
            },
        });
        if (overlappingLeave) {
            throw new common_1.ConflictException('Leave application already exists for the given period');
        }
        const leave = this.leaveRepository.create({
            ...createLeaveDto,
            user,
            startDate,
            endDate,
        });
        await this.leaveRepository.save(leave);
        return createLeaveDto;
    }
    findAll() {
        return `This action returns all leaveApplication`;
    }
    findOne(id) {
        return `This action returns a #${id} leaveApplication`;
    }
    update(id, updateLeaveApplicationDto) {
        return `This action updates a #${id} leaveApplication`;
    }
    remove(id) {
        return `This action removes a #${id} leaveApplication`;
    }
};
exports.LeaveApplicationService = LeaveApplicationService;
exports.LeaveApplicationService = LeaveApplicationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(leave_application_entity_1.Leave)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Connection])
], LeaveApplicationService);
//# sourceMappingURL=leave-application.service.js.map