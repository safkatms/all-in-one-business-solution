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

    await this.connection.query(`SET search_path TO "${user.company}"`);

    const overlappingLeave = await this.leaveRepository.findOne({
      where: {
        userId:  user.userId , // Correct way to query based on related user's ID
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
  
  
  

  findAll() {
    return this.leaveRepository.find();
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
