import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { LeaveApplicationService } from './leave-application.service';
import { CreateLeaveApplicationDto } from './dto/create-leave-application.dto';
import { UpdateLeaveApplicationDto } from './dto/update-leave-application.dto';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { SetSchemaGuard } from 'src/guards/schema.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { ApiTags, ApiBearerAuth, ApiBody } from '@nestjs/swagger';

@Controller('leave')
@UseGuards(JwtAuthGuard)
@ApiTags('Leave Applications')
@ApiBearerAuth('access-token')
export class LeaveApplicationController {
  constructor(private readonly leaveApplicationService: LeaveApplicationService) {}

  @Post()
  @UseGuards(new RoleGuard(['accountant','inventory_manager','salesman']))
  @ApiBody({ type: CreateLeaveApplicationDto })
  async create(@Req() req, @Body(ValidationPipe) createLeaveDto: CreateLeaveApplicationDto) {
    return this.leaveApplicationService.createLeaveApplication(req.user.userId, createLeaveDto);
  }

  @Get('/pending')
  @UseGuards(SetSchemaGuard, new RoleGuard(['owner','hr']))
  findAllPendingApplication() {
    return this.leaveApplicationService.findAllPendingApplication();
  }

  @Get('/history')
  @UseGuards(SetSchemaGuard, new RoleGuard(['owner','hr']))
  findAll() {
    return this.leaveApplicationService.findAllUpdatedApplication();
  }

  @Get('user/history')
  @UseGuards(SetSchemaGuard, new RoleGuard(['accountant','inventory_manager','salesman']))
  findAllByUserId(@Req() req, userId: number) {
    return this.leaveApplicationService.findAllByUserId(req.user.userId);
  }

  @Patch(':id')
  @UseGuards(SetSchemaGuard, new RoleGuard(['owner','hr']))
  @ApiBody({ type: UpdateLeaveApplicationDto })
  update(@Param('id') id: string, @Body(ValidationPipe) updateLeaveApplicationDto: UpdateLeaveApplicationDto) {
    return this.leaveApplicationService.updateStatus(+id, updateLeaveApplicationDto);
  }
}
