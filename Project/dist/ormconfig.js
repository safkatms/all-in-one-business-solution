"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const package_entity_1 = require("./src/package/entities/package.entity");
const user_entity_1 = require("./src/user/entities/user.entity");
exports.config = {
    type: 'postgres',
    database: 'project',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '123',
    entities: [user_entity_1.User, package_entity_1.Package],
    synchronize: true,
};
//# sourceMappingURL=ormconfig.js.map