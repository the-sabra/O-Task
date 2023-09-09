import { newTask } from "src/db/Entities/task";
export declare class UpdateTaskInput implements newTask {
    title: string;
    description: string;
    parent_id: number;
}
