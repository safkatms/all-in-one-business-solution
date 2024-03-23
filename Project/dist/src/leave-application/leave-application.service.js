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
        await this.connection.query(`SET search_path TO "${user.company}"`);
        const overlappingLeave = await this.leaveRepository.findOne({
            where: {
                userId: user.userId,
                startDate: (0, typeorm_2.LessThanOrEqual)(new Date(createLeaveDto.endDate)),
                endDate: (0, typeorm_2.MoreThanOrEqual)(new Date(createLeaveDto.startDate)),
            },
        });
        if (overlappingLeave) {
            throw new common_1.ConflictException('Leave application already exists for the given period');
        }
        const leave = this.leaveRepository.create({
            ...createLeaveDto,
            user,
        });
        await this.leaveRepository.save(leave);
        return leave;
    }
    findAllPendingApplication() {
        return this.leaveRepository.find({
            where: {
                status: 'Pending'
            }
        });
    }
    findAllUpdatedApplication() {
        return this.leaveRepository.find({
            where: {
                status: (0, typeorm_2.In)(['Approved', 'Rejected'])
            }
        });
    }
    findAllByUserId(userId) {
        return this.leaveRepository.find({
            where: {
                userId: userId
            }
        });
    }
    async updateStatus(id, updateLeaveApplicationDto) {
        const leaveApplication = await this.leaveRepository.findOne({
            where: { leaveId: id }
        });
        if (!leaveApplication) {
            throw new common_1.NotFoundException(`Leave application with ID "${id}" not found`);
        }
        leaveApplication.status = updateLeaveApplicationDto.status;
        await this.leaveRepository.save(leaveApplication);
        return leaveApplication;
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