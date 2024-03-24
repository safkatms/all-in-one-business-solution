import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { LeaveApplicationService } from './leave-application.service';
import { CreateLeaveApplicationDto } from './dto/create-leave-application.dto';
import { UpdateLeaveApplicationDto } from './dto/update-leave-application.dto';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { SetSchemaGuard } from 'src/guards/schema.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { ApiTags, ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Leave Applications')
@ApiBearerAuth('access-token')
@Controller('leave')
@UseGuards(JwtAuthGuard)
export class LeaveApplicationController {
  constructor(private readonly leaveApplicationService: LeaveApplicationService) {}

  @Post()
  @UseGuards(new RoleGuard(['accountant','inventory_manager','salesman']))
  @ApiOperation({ summary: 'Create a leave application' })
  @ApiResponse({ status: 201, description: 'Leave application created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiBody({ type: CreateLeaveApplicationDto })
  async create(@Req() req, @Body(ValidationPipe) createLeaveDto: CreateLeaveApplicationDto) {
    return this.leaveApplicationService.createLeaveApplication(req.user.userId, createLeaveDto);
  }

  @Get('/pending')
  @UseGuards(SetSchemaGuard, new RoleGuard(['owner','hr']))
  @ApiOperation({ summary: 'Find all pending leave applications' })
  @ApiResponse({ status: 200, description: 'List of pending leave applications.' })
  findAllPendingApplication() {
    return this.leaveApplicationService.findAllPendingApplication();
  }

  @Get('/history')
  @UseGuards(SetSchemaGuard, new RoleGuard(['owner','hr']))
  @ApiOperation({ summary: 'Find all leave application history' })
  @ApiResponse({ status: 200, description: 'Leave application history.' })
  findAll() {
    return this.leaveApplicationService.findAllUpdatedApplication();
  }

  @Get('user/history')
  @UseGuards(SetSchemaGuard, new RoleGuard(['accountant','inventory_manager','salesman']))
  @ApiOperation({ summary: 'Find leave application history by user ID' })
  @ApiResponse({ status: 200, description: 'Leave application history for a specific user.' })
  findAllByUserId(@Req() req, userId: number) {
    return this.leaveApplicationService.findAllByUserId(req.user.userId);
  }

  @Patch(':id')
  @UseGuards(SetSchemaGuard, new RoleGuard(['owner','hr']))
  @ApiOperation({ summary: 'Update the status of a leave application' })
  @ApiResponse({ status: 200, description: 'Leave application status updated successfully.' })
  @ApiResponse({ status: 404, description: 'Leave application not found.' })
  @ApiParam({ name: 'id', type: 'number', description: 'Leave application ID' })
  @ApiBody({ type: UpdateLeaveApplicationDto })
  update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateLeaveApplicationDto: UpdateLeaveApplicationDto) {
    return this.leaveApplicationService.updateStatus(id, updateLeaveApplicationDto);
  }
}
