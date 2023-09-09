"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
const drizzle_orm_1 = require("drizzle-orm");
const taskQSchema_1 = require("../schema/taskQSchema");
const task_1 = require("../db/Entities/task");
const DBClient_1 = require("../db/DBClient");
const newTask_1 = require("../inputs/newTask");
const updateTask_1 = require("../inputs/updateTask");
const apollo_server_express_1 = require("apollo-server-express");
let TaskResolver = class TaskResolver {
    async tasks(context) {
        let result = await DBClient_1.db
            .select()
            .from(task_1.tasks)
            .where((0, drizzle_orm_1.eq)(task_1.tasks.userId, context.req.userId));
        return result;
    }
    async getTask(id, context) {
        const result = await DBClient_1.db
            .select()
            .from(task_1.tasks)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(task_1.tasks.id, +id), (0, drizzle_orm_1.eq)(task_1.tasks.userId, context.req.userId)));
        return result;
    }
    async checkDone(id, context) {
        const doneTask = await DBClient_1.db
            .update(task_1.tasks)
            .set({ status: "done" })
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(task_1.tasks.id, +id), (0, drizzle_orm_1.eq)(task_1.tasks.userId, context.req.userId)))
            .returning();
        if (!doneTask[0]) {
            throw new Error("task not found");
        }
        return doneTask[0];
    }
    async childTasks(parent) {
        const childTasks = await DBClient_1.db
            .select()
            .from(task_1.tasks)
            .where((0, drizzle_orm_1.eq)(task_1.tasks.parent_id, parent.id));
        return childTasks;
    }
    async search(query, context) {
        const searchedTasks = await DBClient_1.db
            .select()
            .from(task_1.tasks)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(task_1.tasks.userId, context.req.userId), (0, drizzle_orm_1.or)((0, drizzle_orm_1.ilike)(task_1.tasks.title, `%${query}%`), (0, drizzle_orm_1.ilike)(task_1.tasks.description, `%${query}%`))));
        return searchedTasks;
    }
    async createTask(taskData, context) {
        const insertedData = Object.assign(Object.assign({}, taskData), { userId: context.req.userId });
        const savedTask = await DBClient_1.db.insert(task_1.tasks).values(insertedData).returning();
        return savedTask[0];
    }
    async updateTask(id, edits, context) {
        const checkUserCreatedTask = await DBClient_1.db
            .select()
            .from(task_1.tasks)
            .where((0, drizzle_orm_1.eq)(task_1.tasks.id, +id));
        if (context.req.userId !== checkUserCreatedTask[0].userId) {
            throw new apollo_server_express_1.ApolloError("You can't delete task you don't created");
        }
        const updatedTask = await DBClient_1.db
            .update(task_1.tasks)
            .set(edits)
            .where((0, drizzle_orm_1.eq)(task_1.tasks.id, +id))
            .returning();
        if (!updatedTask[0]) {
            throw new Error("task not found");
        }
        return updatedTask[0];
    }
    async deleteTask(id, context) {
        const checkUserCreatedTask = await DBClient_1.db
            .select()
            .from(task_1.tasks)
            .where((0, drizzle_orm_1.eq)(task_1.tasks.id, +id));
        if (context.req.userId !== checkUserCreatedTask[0].userId) {
            throw new apollo_server_express_1.ApolloError("You can't delete task you don't created");
        }
        const task = await DBClient_1.db.delete(task_1.tasks).where((0, drizzle_orm_1.eq)(task_1.tasks.id, +id)).returning();
        return task[0];
    }
};
__decorate([
    (0, type_graphql_1.Query)((returns) => [taskQSchema_1.Task]),
    (0, type_graphql_1.Authorized)(),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TaskResolver.prototype, "tasks", null);
__decorate([
    (0, type_graphql_1.Query)((returns) => [taskQSchema_1.Task]),
    (0, type_graphql_1.Authorized)(),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TaskResolver.prototype, "getTask", null);
__decorate([
    (0, type_graphql_1.Query)((returns) => taskQSchema_1.Task),
    (0, type_graphql_1.Authorized)(),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TaskResolver.prototype, "checkDone", null);
__decorate([
    (0, type_graphql_1.FieldResolver)(),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [taskQSchema_1.Task]),
    __metadata("design:returntype", Promise)
], TaskResolver.prototype, "childTasks", null);
__decorate([
    (0, type_graphql_1.Query)((returns) => [taskQSchema_1.Task]),
    (0, type_graphql_1.Authorized)(),
    __param(0, (0, type_graphql_1.Arg)("Query")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TaskResolver.prototype, "search", null);
__decorate([
    (0, type_graphql_1.Mutation)((returns) => taskQSchema_1.Task),
    (0, type_graphql_1.Authorized)(),
    __param(0, (0, type_graphql_1.Arg)("taskData")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [newTask_1.NewTaskInput, Object]),
    __metadata("design:returntype", Promise)
], TaskResolver.prototype, "createTask", null);
__decorate([
    (0, type_graphql_1.Mutation)((returns) => taskQSchema_1.Task),
    (0, type_graphql_1.Authorized)(),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __param(1, (0, type_graphql_1.Arg)("edits")),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, updateTask_1.UpdateTaskInput, Object]),
    __metadata("design:returntype", Promise)
], TaskResolver.prototype, "updateTask", null);
__decorate([
    (0, type_graphql_1.Mutation)((returns) => taskQSchema_1.Task),
    (0, type_graphql_1.Authorized)(),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TaskResolver.prototype, "deleteTask", null);
TaskResolver = __decorate([
    (0, type_graphql_1.Resolver)(taskQSchema_1.Task)
], TaskResolver);
exports.default = TaskResolver;
//# sourceMappingURL=task.js.map