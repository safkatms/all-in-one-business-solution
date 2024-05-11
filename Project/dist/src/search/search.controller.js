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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchController = void 0;
const common_1 = require("@nestjs/common");
const search_service_1 = require("./search.service");
const schema_guard_1 = require("../guards/schema.guard");
const jwt_guard_1 = require("../guards/jwt.guard");
const role_guard_1 = require("../guards/role.guard");
const swagger_1 = require("@nestjs/swagger");
let SearchController = class SearchController {
    constructor(searchService) {
        this.searchService = searchService;
    }
    findOne(qry) {
        return this.searchService.findAny(qry);
    }
};
exports.SearchController = SearchController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiQuery)({
        name: 'productName',
        required: false,
        description: 'Name of the product',
        example: 'Nimbus2000',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'productDetails',
        required: false,
        description: 'Details of the product',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'productPurchasePrice',
        required: false,
        description: 'Purchase price of the product',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'productSellPrice',
        required: false,
        description: 'Sell price of the product',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'productBrand',
        required: false,
        description: 'Brand of the product',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'productQuantity',
        required: false,
        description: 'Quantity of the product',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'search',
        required: false,
        description: 'Search term for filtering products',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'vendorName',
        required: false,
        description: 'Name of the vendor',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'vendorContact',
        required: false,
        description: 'Contact number of the vendor',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'vendorEmail',
        required: false,
        description: 'Email of the vendor',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'purchaseDate',
        required: false,
        description: 'Date of the purchase',
    }),
    (0, swagger_1.ApiOkResponse)({ description: 'Search results found.' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Bad request. Invalid input.' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SearchController.prototype, "findOne", null);
exports.SearchController = SearchController = __decorate([
    (0, swagger_1.ApiTags)('Search'),
    (0, common_1.Controller)('search'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, schema_guard_1.SetSchemaGuard, new role_guard_1.RoleGuard(['inventory_manager', 'owner'])),
    __metadata("design:paramtypes", [search_service_1.SearchService])
], SearchController);
//# sourceMappingURL=search.controller.js.map