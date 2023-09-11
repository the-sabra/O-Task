// src/schema.ts
import {
  Query,
  Mutation,
  Resolver,
  Arg,
  FieldResolver,
  Root,
  Authorized,
  Ctx,
} from "type-graphql";
import { eq, and, ilike, or } from "drizzle-orm";
import { Task } from "../schema/taskQSchema";
import { tasks, Tasks } from "../db/Entities/task";
import { db } from "../db/DBClient";
import { NewTaskInput } from "../inputs/newTask";
import { UpdateTaskInput } from "../inputs/updateTask";
import { MyContext } from "src/types/MyContext";
import { ApolloError } from "apollo-server-express";

@Resolver(Task)
class TaskResolver {
  @Query((_returns) => [Task])
  @Authorized()
  async tasks(@Ctx() context: MyContext) {
    let result: any = await db
      .select()
      .from(tasks)
      .where(eq(tasks.userId, context.req.userId));
    return result;
  }
  @Query((_returns) => [Task])
  @Authorized()
  async getTask(@Arg("id") id: string, @Ctx() context: MyContext) {
    const result = await db
      .select()
      .from(tasks)
      .where(and(eq(tasks.id, +id), eq(tasks.userId, context.req.userId)));
    return result;
  }

  @Query((_returns) => Task)
  @Authorized()
  async checkDone(@Arg("id") id: string, @Ctx() context: MyContext) {
    const doneTask = await db
      .update(tasks)
      .set({ status: "done" })
      .where(and(eq(tasks.id, +id), eq(tasks.userId, context.req.userId)))
      .returning();
    if (!doneTask[0]) {
      throw new Error("task not found");
    }
    return doneTask[0];
  }
  //this to handle the childTasks in the GraphQL schema and DB schema
  @FieldResolver()
  async childTasks(@Root() parent: Task) {
    const childTasks = await db
      .select()
      .from(tasks)
      .where(eq(tasks.parent_id, parent.id));
    return childTasks;
  }

  @Query((_returns) => [Task])
  @Authorized()
  async search(
    @Arg("Query") query: string,
    @Ctx() context: MyContext
  ): Promise<Tasks[]> {
    const searchedTasks = await db
      .select()
      .from(tasks)
      .where(
        and(
          eq(tasks.userId, context.req.userId),
          or(
            ilike(tasks.title, `%${query}%`),
            ilike(tasks.description, `%${query}%`)
          )
        )
      );
    return searchedTasks;
  }
  //creating Task
  @Mutation((_returns) => Task)
  @Authorized()
  async createTask(
    @Arg("taskData") taskData: NewTaskInput,
    @Ctx() context: MyContext
  ): Promise<Tasks> {
    const insertedData = { ...taskData, userId: context.req.userId };
    const savedTask = await db.insert(tasks).values(insertedData).returning();
    return savedTask[0];
  }

  //updating Task
  @Mutation((_returns) => Task)
  @Authorized()
  async updateTask(
    @Arg("id") id: string,
    @Arg("edits") edits: UpdateTaskInput,
    @Ctx() context: MyContext
  ): Promise<Tasks | string> {
    const checkUserCreatedTask = await db
      .select()
      .from(tasks)
      .where(eq(tasks.id, +id));
    if (context.req.userId !== checkUserCreatedTask[0].userId) {
      throw new ApolloError("You can't delete task you don't created");
    }
    const updatedTask = await db
      .update(tasks)
      .set(edits)
      .where(eq(tasks.id, +id))
      .returning();
    if (!updatedTask[0]) {
      throw new Error("task not found");
    }
    return updatedTask[0];
  }

  @Mutation((_returns) => Task)
  @Authorized()
  async deleteTask(@Arg("id") id: string, @Ctx() context: MyContext) {
    const checkUserCreatedTask = await db
      .select()
      .from(tasks)
      .where(eq(tasks.id, +id));
    if (context.req.userId !== checkUserCreatedTask[0].userId) {
      throw new ApolloError("You can't delete task you don't created");
    }
    const task = await db.delete(tasks).where(eq(tasks.id, +id)).returning();
    return task[0];
  }
}

export default TaskResolver;
