

// import { localTaskRepository } from '../data/localDataTaskRepository';
import { nocoTaskRepository } from '../data/nocoTaskRepository';
import type { Task } from '../interface/BoardInterface';
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
    const createTask = async (task: Partial<Task>) => {
        const newTask = await resository.createTask(task);
        return newTask;
    }


    return {
        getAllTasks,
        updateTask,
        createTask,

  }
}
