import type { Task } from "../interface/BoardInterface";
import type { TaskRepository } from "../interface/TaskRepository";

const urlApi = "https://app.nocodb.com/api/v2/tables/mn1qk0vl2y2xxdc/records";
const token = "ze-hQCYQLixSb3jXFSoKUnspjD2DQIn-wDOb3DWk";

export const nocoTaskRepository: TaskRepository = {
  getAllTasks: async function (): Promise<Task[]> {
    const opciones = {
      method: "GET",
      headers: {
        accept: "application/json",
        "xc-token": token,
      },
    };
    const response = await fetch(urlApi, opciones);
    if (!response.ok) {
      throw new Error("Error al obtener los tableros");
    }
    const data = await response.json();
    const task: Task[] = data.list;
    return task;
  },
  createTask: async function (task: Omit<Task, "Id">): Promise<Task> {
    const opciones = {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "xc-token": token,
      },
      body: JSON.stringify(task),
    };

    try {
      const resp = await fetch(urlApi, opciones);
      const datos = await resp.json();
      const newTask = { ...task, Id: datos.Id };
      return newTask as Task;
    } catch (error) {
      throw new Error("Error al crear la tarea");
    }
  },

  updateTask: async function (task: Task): Promise<Task | null> {
    const opciones = {
      method: "PATCH",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "xc-token": token,
      },
      body: JSON.stringify(task),
    };

    try {
      const resp = await fetch(urlApi, opciones);
      if (!resp.ok) {
        throw new Error("Error al actualizar la tarea");
      }
      const datos = await resp.json();
      const newTask: Task = {
        Id: datos.Id,
        Title: task.Title!,
        columnId: task.columnId!,
      };
      return newTask;
    } catch (error) {
      throw new Error("Error al actualizar la tarea");
    }
  },
  deleteTask: async function (taskId: string): Promise<string> {
    const opciones = {
      method: "DELETE",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "xc-token": token,
      },
      body: JSON.stringify({ Id: taskId }),
    };

    try {
      const resp = await fetch(urlApi, opciones);
      const datos = await resp.json();
      return datos.Id;
    } catch (error) {
      throw new Error("Error al eliminar la board");
    }
  },
};
