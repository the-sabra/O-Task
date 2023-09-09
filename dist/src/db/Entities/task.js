"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tasks = exports.statusEnum = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const user_1 = require("./user");
exports.statusEnum = (0, pg_core_1.pgEnum)("status", ["done", "pending"]);
exports.tasks = (0, pg_core_1.pgTable)("task", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    title: (0, pg_core_1.char)("title", { length: 256 }).notNull(),
    description: (0, pg_core_1.text)("description"),
    status: (0, exports.statusEnum)("status").default("pending").notNull(),
    parent_id: (0, pg_core_1.integer)("parent_id").references(() => exports.tasks.id),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow().notNull(),
    userId: (0, pg_core_1.integer)("userId").references(() => user_1.users.id),
});
//# sourceMappingURL=task.js.map