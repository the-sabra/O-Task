"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = __importStar(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userQSchema_1 = require("../schema/userQSchema");
const newUser_1 = __importDefault(require("../inputs/newUser"));
const type_graphql_1 = require("type-graphql");
const DBClient_1 = require("../db/DBClient");
const user_1 = require("../db/Entities/user");
const drizzle_orm_1 = require("drizzle-orm");
const SignIn_1 = __importDefault(require("../inputs/SignIn"));
const apollo_server_express_1 = require("apollo-server-express");
let UserResolver = class UserResolver {
    async signUp(newUser) {
        var _a;
        try {
            console.log(newUser);
            const checkEmail = await DBClient_1.db
                .select({
                email: user_1.users.email,
            })
                .from(user_1.users)
                .where((0, drizzle_orm_1.eq)(user_1.users.email, newUser.email));
            if ((_a = checkEmail[0]) === null || _a === void 0 ? void 0 : _a.email) {
                throw new apollo_server_express_1.ApolloError("email exist");
            }
            const hashedPassword = await bcrypt.hash(newUser.password, 10);
            const user = await DBClient_1.db
                .insert(user_1.users)
                .values({
                email: newUser.email,
                password: hashedPassword,
                name: newUser.name,
            })
                .returning({
                id: user_1.users.id,
                name: user_1.users.name,
                email: user_1.users.email,
                createdAt: user_1.users.createdAt,
            });
            return user[0];
        }
        catch (error) {
            throw new apollo_server_express_1.ApolloError(error);
        }
    }
    async signIn(userSignIn) {
        var _a;
        const user = await DBClient_1.db
            .select()
            .from(user_1.users)
            .where((0, drizzle_orm_1.eq)(user_1.users.email, userSignIn.email));
        if (!((_a = user[0]) === null || _a === void 0 ? void 0 : _a.email)) {
            throw new apollo_server_express_1.ApolloError("email not found");
        }
        const passCheck = await bcrypt.compare(userSignIn.password, user[0].password);
        if (!passCheck) {
            throw new apollo_server_express_1.ApolloError("wrong password");
        }
        const privatekey = process.env.JWTSECERT;
        const token = jsonwebtoken_1.default.sign({
            userId: user[0].id,
        }, privatekey);
        const res = Object.assign(Object.assign({}, user[0]), { token: token });
        return res;
    }
};
__decorate([
    (0, type_graphql_1.Mutation)((returns) => userQSchema_1.User),
    __param(0, (0, type_graphql_1.Arg)("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [newUser_1.default]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "signUp", null);
__decorate([
    (0, type_graphql_1.Mutation)((returns) => userQSchema_1.User),
    __param(0, (0, type_graphql_1.Arg)("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [SignIn_1.default]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "signIn", null);
UserResolver = __decorate([
    (0, type_graphql_1.Resolver)(userQSchema_1.User)
], UserResolver);
exports.default = UserResolver;
//# sourceMappingURL=user.js.map