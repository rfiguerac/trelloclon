

import type { Task } from '../interface/BoardInterface';

export const useTask = () => {
    
        const urlApi = "https://app.nocodb.com/api/v2/tables/mn1qk0vl2y2xxdc/records";
        const token = "ze-hQCYQLixSb3jXFSoKUnspjD2DQIn-wDOb3DWk";

    const getAllTasks = async () => {

        const opciones = {
              method: "GET",
              headers: {
                accept: "application/json",
                "xc-token": token,
              },
            };
            const response = await fetch(urlApi, opciones);
            if (!response.ok) {
              throw new Error("Error al obtener los tasks");
            }
            const data = await response.json();
            const task: Task[] = data.list.map((task: any) => ({
              id: task.Id,
              title: task.Title,
              columnId: task.columnId,
            }));
            return task;
        
    }
    
    const updateTask = async (task: any) => {
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
      return datos;
    } catch (error) {
      console.log(error);
      return null;
    }
    }


    return {
        getAllTasks,
        updateTask,

  }
}
