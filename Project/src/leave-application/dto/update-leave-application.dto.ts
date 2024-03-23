import { PartialType } from '@nestjs/mapped-types';
import { CreateLeaveApplicationDto } from './create-leave-application.dto';

export class UpdateLeaveApplicationDto extends PartialType(CreateLeaveApplicationDto) {}
