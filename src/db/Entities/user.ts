import {
  serial,
  text,
  timestamp,
  pgTable,
  char,
  bigserial,
} from "drizzle-orm/pg-core";

export const users = pgTable("user", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  name: char("name", { length: 150 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  restToken: text("restToken"),
  tokenExp: bigserial("tokenExp", { mode: "number" }),
});

export type Users = typeof users.$inferSelect;
export type newUser = typeof users.$inferInsert;
