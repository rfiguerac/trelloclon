import { create } from "zustand";
import type { Task } from "../interface/BoardInterface";
import { taskService } from "../services/taskService";

const { getTasks, createTask, updateTask, deleteTask } = taskService();

interface TaskState {
  tasks: Task[];
  fetchTasks: () => Promise<void>;
  addTask: (task: Omit<Task, "Id">) => Promise<void>;
  editTask: (task: Task) => Promise<void>;
  removeTask: (id: string) => Promise<void>;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  fetchTasks: async () => {
    const data = await getTasks();
    set({ tasks: data });
  },
  addTask: async (task) => {
    const created = await createTask(task);
    set((state) => ({ tasks: [...state.tasks, created] }));
  },
  editTask: async (task) => {
    const updated = await updateTask(task);
    if (updated === null) {
      throw new Error("La tarea no se pudo actualizar.");
    }
    set((state) => ({
      tasks: state.tasks.map((t) => (t.Id === task.Id ? updated : t)),
    }));
  },
  removeTask: async (id) => {
    await deleteTask(id);
    set((state) => ({
      tasks: state.tasks.filter((t) => t.Id !== id),
    }));
  },
}));
