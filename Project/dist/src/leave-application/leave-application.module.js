"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaveApplicationModule = void 0;
const common_1 = require("@nestjs/common");
const leave_application_service_1 = require("./leave-application.service");
const leave_application_controller_1 = require("./leave-application.controller");
const leave_middleware_1 = require("../middleware/leave.middleware");
const typeorm_1 = require("@nestjs/typeorm");
const leave_application_entity_1 = require("./entities/leave-application.entity");
const user_entity_1 = require("../user/entities/user.entity");
let LeaveApplicationModule = class LeaveApplicationModule {
    configure(consumer) {
        consumer
            .apply(leave_middleware_1.LeaveMiddleware)
            .forRoutes({ path: 'leave', method: common_1.RequestMethod.POST });
    }
};
exports.LeaveApplicationModule = LeaveApplicationModule;
exports.LeaveApplicationModule = LeaveApplicationModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([leave_application_entity_1.Leave, user_entity_1.User])],
        controllers: [leave_application_controller_1.LeaveApplicationController],
        providers: [leave_application_service_1.LeaveApplicationService],
    })
], LeaveApplicationModule);
//# sourceMappingURL=leave-application.module.js.map