"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const schema_1 = __importDefault(require("./schema"));
async function startServer() {
    const app = (0, express_1.default)();
    const schema = await (0, type_graphql_1.buildSchema)({
        resolvers: [schema_1.default],
    });
    const server = new apollo_server_express_1.ApolloServer({ schema });
    await server.start();
    server.applyMiddleware({ app });
    app.listen({ port: 4000 }, () => console.log(`Server is running at http://localhost:4000/graphql`));
}
startServer();
//# sourceMappingURL=app.js.map