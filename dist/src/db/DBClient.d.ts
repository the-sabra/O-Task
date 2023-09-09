import * as tasks from "./Entities/task";
export declare const db: import("drizzle-orm/node-postgres").NodePgDatabase<{
    tasks: typeof tasks;
}>;
