import "reflect-metadata";
import "dotenv/config";
import express from "express";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { customAuthChecker } from "./decorator/AuthChecker";
import TaskResolver from "./resolver/task";
import UserResolver from "./resolver/user";

const PORT = process.env.PORT || 4000;

async function startServer() {
  const app = express();

  app.use(cors());

  const schema = await buildSchema({
    resolvers: [UserResolver, TaskResolver],
    authChecker: customAuthChecker,
  });

  const server = new ApolloServer({
    schema,
    context: ({ req }: any) => ({ req }),
  });

  // Start the Apollo Server first
  await server.start();

  // Apply middleware after starting the server
  server.applyMiddleware({ app });

  app.listen({ port: PORT }, () =>
    console.log(`Server is running at http://localhost:${PORT}/graphql`)
  );
}

startServer();
