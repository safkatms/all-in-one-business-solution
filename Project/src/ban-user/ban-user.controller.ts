import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { BanUserService } from './ban-user.service';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { RoleGuard } from 'src/guards/role.guard';

@Controller('ban-user')
@UseGuards(JwtAuthGuard,new RoleGuard(['admin']))
export class BanUserController {
  constructor(private readonly banUserService: BanUserService) {}

  @Get()
  getAllUsers() {
    return this.banUserService.getAllUsers();
  }

  @Patch(':userId/ban')
  banUser(@Param('userId') userId: number) {
    return this.banUserService.updateBanStatus(userId, true);
  }

  @Patch(':userId/unban')
  unbanUser(@Param('userId') userId: number) {
    return this.banUserService.updateBanStatus(userId, false);
  }
}
