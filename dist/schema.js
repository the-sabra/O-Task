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
const type_graphql_1 = require("type-graphql");
const types_1 = require("./types");
let UserResolver = class UserResolver {
    getUser(id) {
        return types_1.users.find((user) => user.id === id);
    }
    createUser(data) {
        const newUser = Object.assign({ id: types_1.users.length + 1 }, data);
        types_1.users.push(newUser);
        return newUser;
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => types_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", types_1.User)
], UserResolver.prototype, "getUser", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => types_1.User),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.CreateUserInput]),
    __metadata("design:returntype", types_1.User)
], UserResolver.prototype, "createUser", null);
UserResolver = __decorate([
    (0, type_graphql_1.Resolver)(types_1.User)
], UserResolver);
exports.default = UserResolver;
//# sourceMappingURL=schema.js.map