import {
  serial,
  text,
  timestamp,
  pgTable,
  char,
  pgEnum,
  integer,
  type AnyPgColumn,
} from "drizzle-orm/pg-core";
import { users } from "./user";

export const statusEnum = pgEnum("status", ["done", "pending"]);

export const tasks = pgTable("task", {
  id: serial("id").primaryKey(),
  title: char("title", { length: 256 }).notNull(),
  description: text("description"),
  status: statusEnum("status").default("pending").notNull(),
  parent_id: integer("parent_id").references((): AnyPgColumn => tasks.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  userId: integer("userId").references((): AnyPgColumn => users.id),
});

export type Tasks = typeof tasks.$inferSelect;
export type newTask = typeof tasks.$inferInsert;
