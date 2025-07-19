import type { Task } from "../interface/BoardInterface";
import type { TaskRepository } from "../interface/TaskRepository";



const urlApi = "https://app.nocodb.com/api/v2/tables/mn1qk0vl2y2xxdc/records";
const token = "ze-hQCYQLixSb3jXFSoKUnspjD2DQIn-wDOb3DWk";

export const localTaskRepository: TaskRepository = {
  getAllTasks: async function (): Promise<Task[]> {
    
    const tasks: Task[] = [
      {
        Id: "1",
        Title: "Tarea de Ejemplo",
        columnId: "1",
      },

      {
        Id: "2",
        Title: "Otra Tarea",
        columnId: "2",
      },
      {
        Id: "3",
        Title: "Tarea de Proyecto",
        columnId: "2",
      },

      {
        Id: "4",
        Title: "Tarea de Desarrollo",
        columnId: "1",
      },
      {
        Id: "5",
        Title: "Tarea de Desarrollor large text, Tarea de Desarrollor large text",
        columnId: "1",
      }

    ]
    return tasks;
  },
  createTask: async function (task: Partial<Task>): Promise<Task> {
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
      console.log(error);
      return task as Task;
    }
  },

  updateTask: async function (task: Partial<Task>): Promise<Task | null> {
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
      const datos = await resp.json();
      return datos.Id;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  deleteTask: async function (boardId: string): Promise<string> {
    const opciones = {
      method: "DELETE",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "xc-token": token,
      },
      body: JSON.stringify({ Id: boardId }),
    };

    try {
      const resp = await fetch(urlApi, opciones);
      const datos = await resp.json();
      return datos.Id;
    } catch (error) {
      console.log(error);
      throw new Error("Error al eliminar la board");
    }
  },
};
