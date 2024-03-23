"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaveMiddleware = void 0;
const common_1 = require("@nestjs/common");
let LeaveMiddleware = class LeaveMiddleware {
    use(req, res, next) {
        console.log('LeaveMiddleware is running...');
        const { startDate, endDate } = req.body;
        const start = new Date(startDate);
        const end = new Date(endDate);
        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            throw new common_1.BadRequestException('Invalid dates provided.');
        }
        if (start >= end) {
            throw new common_1.BadRequestException('The start date cannot be after the end date.');
        }
        const differenceInTime = end.getTime() - start.getTime();
        const differenceInDays = differenceInTime / (1000 * 3600 * 24);
        if (differenceInDays > 7) {
            throw new common_1.BadRequestException('Leave application cannot span more than 7 days.');
        }
        next();
    }
};
exports.LeaveMiddleware = LeaveMiddleware;
exports.LeaveMiddleware = LeaveMiddleware = __decorate([
    (0, common_1.Injectable)()
], LeaveMiddleware);
//# sourceMappingURL=leave.middleware.js.map