import { localTaskRepository } from "../data/localDataTaskRepository";
import { nocoTaskRepository } from "../data/nocoTaskRepository";
import type { Task } from "../interface/BoardInterface";
import type { TaskRepository } from "../interface/TaskRepository";

export const taskService = (
  resository: TaskRepository = localTaskRepository
) => {
  const getTasks = async () => {
    const tasks = await resository.getAllTasks();
    return tasks;
  };

  const updateTask = async (task: Task) => {
    const updatedTask = await resository.updateTask(task);

    return updatedTask;
  };
  const createTask = async (task: Omit<Task, "Id">) => {
    const newTask = await resository.createTask(task);
    return newTask;
  };
  const deleteTask = async (id: string) => {
    await resository.deleteTask(id);
    return id;
  };

  return {
    getTasks,
    updateTask,
    createTask,
    deleteTask,
  };
};
