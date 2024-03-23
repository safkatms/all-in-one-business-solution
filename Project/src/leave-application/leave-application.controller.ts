import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, ValidationPipe } from '@nestjs/common';
import { LeaveApplicationService } from './leave-application.service';
import { CreateLeaveApplicationDto } from './dto/create-leave-application.dto';
import { UpdateLeaveApplicationDto } from './dto/update-leave-application.dto';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { SetSchemaGuard } from 'src/guards/schema.guard';
import { RoleGuard } from 'src/guards/role.guard';

@Controller('leave')
@UseGuards(JwtAuthGuard)
export class LeaveApplicationController {
  constructor(private readonly leaveApplicationService: LeaveApplicationService) {}

  
  @Post()
  @UseGuards(new RoleGuard(['accountant','inventory_manager','salesman']))
  async create(@Req() req, @Body(ValidationPipe) createLeaveDto: CreateLeaveApplicationDto) {
    return this.leaveApplicationService.createLeaveApplication(req.user.userId, createLeaveDto);
  }

  @Get()
  @UseGuards(SetSchemaGuard, new RoleGuard(['owner','hr']))
  findAll() {
    return this.leaveApplicationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.leaveApplicationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLeaveApplicationDto: UpdateLeaveApplicationDto) {
    return this.leaveApplicationService.update(+id, updateLeaveApplicationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.leaveApplicationService.remove(+id);
  }
}
