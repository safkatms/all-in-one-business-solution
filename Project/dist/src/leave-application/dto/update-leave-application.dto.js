"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateLeaveApplicationDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
var ApplicationStatus;
(function (ApplicationStatus) {
    ApplicationStatus["Approved"] = "Approved";
    ApplicationStatus["Rejected"] = "Rejected";
})(ApplicationStatus || (ApplicationStatus = {}));
class UpdateLeaveApplicationDto {
}
exports.UpdateLeaveApplicationDto = UpdateLeaveApplicationDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Status of the leave application. Must be either "Approved" or "Rejected".',
        enum: ApplicationStatus,
        example: ApplicationStatus.Approved
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(ApplicationStatus, { message: 'Status must be either "Approved" or "Rejected"' }),
    __metadata("design:type", String)
], UpdateLeaveApplicationDto.prototype, "status", void 0);
//# sourceMappingURL=update-leave-application.dto.js.map