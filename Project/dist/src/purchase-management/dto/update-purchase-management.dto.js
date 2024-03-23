"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePurchaseManagementDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_purchase_management_dto_1 = require("./create-purchase-management.dto");
class UpdatePurchaseManagementDto extends (0, mapped_types_1.PartialType)(create_purchase_management_dto_1.CreatePurchaseManagementDto) {
}
exports.UpdatePurchaseManagementDto = UpdatePurchaseManagementDto;
//# sourceMappingURL=update-purchase-management.dto.js.map