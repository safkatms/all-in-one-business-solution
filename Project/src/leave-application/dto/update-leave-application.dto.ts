import { IsEnum, IsNotEmpty } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

enum ApplicationStatus {
    Approved = "Approved",
    Rejected = "Rejected"
}

export class UpdateLeaveApplicationDto {
    @ApiProperty({ 
        description: 'Status of the leave application. Must be either "Approved" or "Rejected".',
        enum: ApplicationStatus,
        example: ApplicationStatus.Approved 
    })
    @IsNotEmpty()
    @IsEnum(ApplicationStatus, { message: 'Status must be either "Approved" or "Rejected"' })
    status: ApplicationStatus;
}
