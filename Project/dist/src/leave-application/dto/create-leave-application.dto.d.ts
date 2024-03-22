export declare enum LeaveStatus {
    Pending = "pending",
    Approved = "approved"
}
export declare class CreateLeaveApplicationDto {
    startDate: string;
    endDate: string;
    description: string;
}
