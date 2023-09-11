import "reflect-metadata";
import "dotenv/config";
import * as Express from "express";
import * as cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { customAuthChecker } from "./decorator/AuthChecker";
import TaskResolver from "./resolver/task";
import UserResolver from "./resolver/user";

const PORT = process.env.PORT || 4000;

async function startServer() {
  const schema = await buildSchema({
    resolvers: [UserResolver, TaskResolver],
    authChecker: customAuthChecker,
  });

  const server = new ApolloServer({
    schema,
    persistedQueries: false,
    context: ({ req }: any) => ({ req }),
  });

  const app = Express();

  app.use(cors());

  await server.start();
  // Apply middleware after starting the server
  server.applyMiddleware({ app });

  app.listen(PORT, () =>
    console.log(`Server is running at http://localhost:${PORT}/graphql`)
  );
}

startServer();
