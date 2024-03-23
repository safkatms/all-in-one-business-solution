import { Controller, Get, Patch, Param, UseGuards } from '@nestjs/common';
import { BanUserService } from './ban-user.service';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags, ApiParam } from '@nestjs/swagger';

@ApiTags('Ban User')
@ApiBearerAuth('access-token')
@Controller('ban-user')
@UseGuards(JwtAuthGuard, new RoleGuard(['admin']))
export class BanUserController {
  constructor(private readonly banUserService: BanUserService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved list of all users' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  getAllUsers() {
    return this.banUserService.getAllUsers();
  }

  @Patch(':userId/ban')
  @ApiOperation({ summary: 'Ban a user' })
  @ApiParam({ name: 'userId', description: 'ID of the user to ban', type: 'number' })
  @ApiResponse({ status: 200, description: 'User has been banned' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  banUser(@Param('userId') userId: number) {
    return this.banUserService.updateBanStatus(userId, true);
  }

  @Patch(':userId/unban')
  @ApiOperation({ summary: 'Unban a user' })
  @ApiParam({ name: 'userId', description: 'ID of the user to unban', type: 'number' })
  @ApiResponse({ status: 200, description: 'User has been unbanned' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  unbanUser(@Param('userId') userId: number) {
    return this.banUserService.updateBanStatus(userId, false);
  }
}
