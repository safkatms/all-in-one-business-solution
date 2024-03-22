import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLeaveApplicationDto } from './dto/create-leave-application.dto';
import { UpdateLeaveApplicationDto } from './dto/update-leave-application.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Leave } from './entities/leave-application.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LeaveApplicationService {
  constructor(
    @InjectRepository(Leave)
    private leaveRepository: Repository<Leave>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createLeaveApplication(userId: number, createLeaveDto: CreateLeaveApplicationDto): Promise<Leave> {
    const user = await this.userRepository.findOneBy({ userId });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const leave = this.leaveRepository.create({
      ...createLeaveDto,
      user,
    });

    await this.leaveRepository.save(leave);
    return leave;
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
