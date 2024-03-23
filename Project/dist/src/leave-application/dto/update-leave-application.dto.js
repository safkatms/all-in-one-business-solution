"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateLeaveApplicationDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_leave_application_dto_1 = require("./create-leave-application.dto");
class UpdateLeaveApplicationDto extends (0, mapped_types_1.PartialType)(create_leave_application_dto_1.CreateLeaveApplicationDto) {
}
exports.UpdateLeaveApplicationDto = UpdateLeaveApplicationDto;
//# sourceMappingURL=update-leave-application.dto.js.map