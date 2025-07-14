

import { nocoTaskRepository } from '../data/nocoTaskRepository';
import type { TaskRepository } from '../interface/TaskRepository';

export const useTask = (resository : TaskRepository = nocoTaskRepository) => {


    const getAllTasks = async () => {
        const tasks = await resository.getAllTasks();
        return tasks;
    }
    
    const updateTask = async (task: any) => {
        const updatedTask = await resository.updateTask(task);
        return updatedTask; 
    }


    return {
        getAllTasks,
        updateTask,

  }
}
