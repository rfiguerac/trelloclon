import type { Task } from "../interface/BoardInterface";
import type { TaskRepository } from "../interface/TaskRepository";

// Base de datos simulada en memoria
let tasks: Task[] = [
  { Id: "1", Title: "Tarea de Ejemplo", columnId: "1" },
  { Id: "2", Title: "Otra Tarea", columnId: "2" },
  { Id: "3", Title: "Tarea de Proyecto", columnId: "2" },
  { Id: "4", Title: "Tarea de Desarrollo", columnId: "1" },
  {
    Id: "5",
    Title: "Tarea de Desarrollor large text, Tarea de Desarrollor large text",
    columnId: "1",
  },
];

let taskIdCounter = tasks.length + 1;

export const localTaskRepository: TaskRepository = {
  getAllTasks: async function (): Promise<Task[]> {
    return tasks;
  },

  createTask: async function (task: Partial<Task>): Promise<Task> {
    const newTask: Task = {
      Id: String(taskIdCounter++),
      Title: task.Title ?? "Sin título",
      columnId: task.columnId ?? "1",
    };
    return newTask;
  },

  updateTask: async function (task: Partial<Task>): Promise<Task | null> {
    if (!task.Id) return null;

    const index = tasks.findIndex((t) => t.Id === task.Id);
    if (index === -1) return null;

    tasks[index] = {
      ...tasks[index],
      ...task,
    };

    return tasks[index];
  },

  deleteTask: async function (taskId: string): Promise<string> {
    const index = tasks.findIndex((t) => t.Id === taskId);
    if (index === -1) throw new Error("Tarea no encontrada");

    tasks.splice(index, 1);
    return taskId;
  },
}
