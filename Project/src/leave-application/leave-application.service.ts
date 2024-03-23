import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateLeaveApplicationDto } from './dto/create-leave-application.dto';
import { UpdateLeaveApplicationDto } from './dto/update-leave-application.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Leave } from './entities/leave-application.entity';
import { User } from 'src/user/entities/user.entity';
import { Connection, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';

@Injectable()
export class LeaveApplicationService {
  constructor(
    @InjectRepository(Leave)
    private leaveRepository: Repository<Leave>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private connection: Connection
  ) {}

  async createLeaveApplication(userId: number, createLeaveDto: CreateLeaveApplicationDto): Promise<any> {
    const user = await this.userRepository.findOneBy({ userId });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const startDate = new Date(createLeaveDto.startDate);
    const endDate = new Date(createLeaveDto.endDate);
  
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      throw new Error('Invalid startDate or endDate');
    }
  
    const overlappingLeave = await this.leaveRepository.findOne({
      where: {
        user: user,
        startDate: LessThanOrEqual(endDate),
        endDate: MoreThanOrEqual(startDate),
      },
    });
  
    if (overlappingLeave) {
      throw new ConflictException('Leave application already exists for the given period');
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

  findOne(id: number) {
    return `This action returns a #${id} leaveApplication`;
  }

  update(id: number, updateLeaveApplicationDto: UpdateLeaveApplicationDto) {
    return `This action updates a #${id} leaveApplication`;
  }

  remove(id: number) {
    return `This action removes a #${id} leaveApplication`;
  }
}
