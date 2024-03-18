"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSearchDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_search_dto_1 = require("./create-search.dto");
class UpdateSearchDto extends (0, mapped_types_1.PartialType)(create_search_dto_1.CreateSearchDto) {
}
exports.UpdateSearchDto = UpdateSearchDto;
//# sourceMappingURL=update-search.dto.js.map