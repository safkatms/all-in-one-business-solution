import { Module } from '@nestjs/common';
import { BanUserService } from './ban-user.service';
import { BanUserController } from './ban-user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [BanUserController],
  providers: [BanUserService],
})
export class BanUserModule {}
