"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const AuthChecker_1 = require("./decorator/AuthChecker");
const task_1 = __importDefault(require("./resolver/task"));
const user_1 = __importDefault(require("./resolver/user"));
const PORT = process.env.PORT || 4000;
async function startServer() {
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)());
    const schema = await (0, type_graphql_1.buildSchema)({
        resolvers: [user_1.default, task_1.default],
        authChecker: AuthChecker_1.customAuthChecker,
    });
    const server = new apollo_server_express_1.ApolloServer({
        schema,
        context: ({ req }) => ({ req }),
    });
    await server.start();
    server.applyMiddleware({ app });
    app.listen({ port: PORT }, () => console.log(`Server is running at http://localhost:${PORT}/graphql`));
}
startServer();
//# sourceMappingURL=app.js.map