"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckCustomerMiddleware = void 0;
const common_1 = require("@nestjs/common");
let CheckCustomerMiddleware = class CheckCustomerMiddleware {
    use(req, res, next) {
        console.log('CheckCustomerMiddleware is running...');
        const { email, contact, name } = req.body;
        if (!email || !this.isValidEmail(email)) {
            throw new common_1.BadRequestException('Invalid or missing email.');
        }
        if (!contact || !this.isValidMobileNumber(contact)) {
            throw new common_1.BadRequestException('Mobile number must be a valid Bangladeshi number of 11 digits.');
        }
        if (!name || !this.isValidName(name)) {
            throw new common_1.BadRequestException('Name must start with a capital letter and contain only alphabets.');
        }
        next();
    }
    isValidEmail(email) {
        return email.includes('@') && email.includes('.');
    }
    isValidMobileNumber(contact) {
        return /^01[3-9]\d{8}$/.test(contact);
    }
    isValidName(name) {
        return /^[A-Z][a-z]*$/.test(name);
    }
};
exports.CheckCustomerMiddleware = CheckCustomerMiddleware;
exports.CheckCustomerMiddleware = CheckCustomerMiddleware = __decorate([
    (0, common_1.Injectable)()
], CheckCustomerMiddleware);
//# sourceMappingURL=check-customer.middleware.js.map