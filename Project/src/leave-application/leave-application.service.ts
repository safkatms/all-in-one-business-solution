import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateLeaveApplicationDto } from './dto/create-leave-application.dto';
import { UpdateLeaveApplicationDto } from './dto/update-leave-application.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Leave } from './entities/leave-application.entity';
import { User } from 'src/user/entities/user.entity';
import { Connection, In, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';

@Injectable()
export class LeaveApplicationService {
  constructor(
    @InjectRepository(Leave)
    private leaveRepository: Repository<Leave>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private connection: Connection
  ) { }

  async createLeaveApplication(userId: number, createLeaveDto: CreateLeaveApplicationDto): Promise<any> {
    const user = await this.userRepository.findOneBy({ userId });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    await this.connection.query(`SET search_path TO "${user.company}"`);

    const overlappingLeave = await this.leaveRepository.findOne({
      where: {
        userId: user.userId,
        startDate: LessThanOrEqual(new Date(createLeaveDto.endDate)),
        endDate: MoreThanOrEqual(new Date(createLeaveDto.startDate)),
      },
    });

    if (overlappingLeave) {
      throw new ConflictException('Leave application already exists for the given period');
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
        status: In(['Approved', 'Rejected'])
      }
    });
  }
  

  findAllByUserId(userId: number) {
    return this.leaveRepository.find({
      where: {
        userId: userId
      }
    });
  }

  async updateStatus(id: number, updateLeaveApplicationDto: UpdateLeaveApplicationDto): Promise<Leave> {
    const leaveApplication = await this.leaveRepository.findOne({
      where: { leaveId: id }
    });

    if (!leaveApplication) {
      throw new NotFoundException(`Leave application with ID "${id}" not found`);
    }

    leaveApplication.status = updateLeaveApplicationDto.status;

    await this.leaveRepository.save(leaveApplication);

    return leaveApplication;
  }

  
}
