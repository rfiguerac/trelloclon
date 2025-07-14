import type { Task } from "../interface/BoardInterface";

export interface TaskRepository {
    getAllTasks(): Promise<Task[]>;
    createTask(task: Task): Promise<Task>;
    updateTask(task: Partial<Task>): Promise<Task | null>;
    deleteTask(taskId: string): Promise<string>;
}