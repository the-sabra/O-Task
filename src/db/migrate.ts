/**
 * this file to make drizzle make the migration in to the DB
 * and apply the schema
 */
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Pool } from "pg";
import * as dotenv from "dotenv";
dotenv.config();
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

const db = drizzle(pool);

async function main() {
  console.log("migration started ...");
  await migrate(db, { migrationsFolder: "drizzle" });
  console.log("migration ended ...");
  process.exit(0);
}

main().catch((err) => {
  console.log(err);
  process.exit(0);
});
