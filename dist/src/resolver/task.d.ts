import { Task } from "../schema/taskQSchema";
import { Tasks } from "../db/Entities/task";
import { NewTaskInput } from "../inputs/newTask";
import { UpdateTaskInput } from "../inputs/updateTask";
import { MyContext } from "types/MyContext";
declare class TaskResolver {
    tasks(context: MyContext): Promise<any>;
    getTask(id: string, context: MyContext): Promise<{
        description: string;
        id: number;
        title: string;
        status: "done" | "pending";
        parent_id: number;
        createdAt: Date;
        userId: number;
    }[]>;
    checkDone(id: string, context: MyContext): Promise<{
        description: string;
        id: number;
        title: string;
        status: "done" | "pending";
        parent_id: number;
        createdAt: Date;
        userId: number;
    }>;
    childTasks(parent: Task): Promise<{
        description: string;
        id: number;
        title: string;
        status: "done" | "pending";
        parent_id: number;
        createdAt: Date;
        userId: number;
    }[]>;
    search(query: string, context: MyContext): Promise<Tasks[]>;
    createTask(taskData: NewTaskInput, context: MyContext): Promise<Tasks>;
    updateTask(id: string, edits: UpdateTaskInput, context: MyContext): Promise<Tasks | string>;
    deleteTask(id: string, context: MyContext): Promise<{
        description: string;
        id: number;
        title: string;
        status: "done" | "pending";
        parent_id: number;
        createdAt: Date;
        userId: number;
    }>;
}
export default TaskResolver;
