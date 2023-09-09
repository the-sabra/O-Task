"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.customAuthChecker = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const apollo_server_express_1 = require("apollo-server-express");
const customAuthChecker = ({ root, args, context, info }, roles) => {
    const authHeader = context.req.get("Authorization");
    if (!authHeader) {
        throw new apollo_server_express_1.AuthenticationError("not authenticated");
    }
    const token = authHeader.split(" ")[1];
    let decodedToken;
    try {
        decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWTSECERT);
    }
    catch (error) {
        throw error;
    }
    if (!decodedToken) {
        throw new apollo_server_express_1.AuthenticationError("not authenticated");
    }
    if (typeof decodedToken !== "string") {
        context.req.userId = decodedToken.userId;
    }
    else {
        throw new apollo_server_express_1.AuthenticationError("not authenticated");
    }
    return true;
};
exports.customAuthChecker = customAuthChecker;
//# sourceMappingURL=AuthChecker.js.map