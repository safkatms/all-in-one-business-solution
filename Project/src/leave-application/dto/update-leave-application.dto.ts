import { IsEnum, IsNotEmpty } from "class-validator";

enum ApplicationStatus {
    Approved = "Approved",
    Rejected = "Rejected"
}

export class UpdateLeaveApplicationDto {
    @IsNotEmpty()
    @IsEnum(ApplicationStatus, { message: 'Status must be either Approved or Rejected' })
    status: ApplicationStatus;
}
