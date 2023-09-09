import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import * as tasks from "./Entities/task";

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

client.connect();

export const db = drizzle(client, { schema: { tasks }, logger: true });
