import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BanUserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }
  async updateBanStatus(userId: number, status: boolean): Promise<string> {
    const owner = await this.usersRepository.findOne({
      where: { userId: userId, userType: 'owner' },
      relations: ['package'],
    });

    if (!owner) {
      throw new Error(`User with ID ${userId} not found or not an owner.`);
    }

    await this.usersRepository.update({ company: owner.company }, { status: status });
    return `Users of company ${owner.company} have been ${status ? 'banned' : 'unbanned'}.`;
  }

  async getAllUsers(): Promise<User[]> {
    return this.usersRepository.find({
      where: { userType: 'owner' }, 
      select: [
        'userId',
        'firstName',
        'lastName',
        'email',
        'username',
        'mobileNo',
        'gender',
        'status',
      ],
    });
  }
}
