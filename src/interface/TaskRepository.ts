import type { Task } from "../interface/BoardInterface";

export interface TaskRepository {
  getAllTasks(): Promise<Task[]>;
  createTask(task: Omit<Task, "Id">): Promise<Task>;
  updateTask(task: Task): Promise<Task | null>;
  deleteTask(taskId: string): Promise<string>;
}
