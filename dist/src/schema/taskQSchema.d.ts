type status = "done" | "pending";
declare class Task {
    id: number;
    title: string;
    description: string;
    status: status;
    parent_id: number;
    childTasks: [Task];
    createdAt: Date;
}
export { Task };
