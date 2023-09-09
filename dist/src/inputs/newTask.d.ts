import { newTask } from "src/db/Entities/task";
export declare class NewTaskInput implements newTask {
    title: string;
    description: string;
    parent_id: number;
}
