import { useState } from "react";

import type { Task } from "../../interface/BoardInterface";
import { useTaskStore } from "../../store/taskStore";
import { useToast } from "../../contexts/ToastContext";

interface CreateTaskProps {
  handleAddTask: () => void;
  selectedColumn: { Id: string };
  isEdit?: boolean;
  taskToEdit?: Task;
}

export const CreateTask = ({
  handleAddTask,
  selectedColumn,
  isEdit = false,
  taskToEdit,
}: CreateTaskProps) => {
  const [newTask, setNewTask] = useState<Partial<Task>>({
    Title: isEdit ? taskToEdit?.Title : "",
  });

  const { addTask, editTask } = useTaskStore();
  const { showToast } = useToast();

  const [error, setError] = useState("");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewTask((prev) => ({ ...prev, Title: value }));

    if (value.trim().length < 3) {
      setError("El título debe tener al menos 3 caracteres.");
    } else {
      setError("");
    }
  };

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.Title!.trim().length < 3) {
      setError("El título debe tener al menos 3 caracteres.");
      return;
    }

    if (isEdit && taskToEdit) {
      await editTask({
        Id: taskToEdit.Id,
        Title: newTask.Title!,
        columnId: selectedColumn.Id,
      });
      showToast("tarea actualizada", "success");
    } else {
      await addTask({
        Title: newTask.Title!,
        columnId: selectedColumn.Id,
      });
      showToast("tarea creada", "success");
    }

    handleAddTask();
  };

  return (
    <dialog open className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">
          {isEdit ? "Editar tarea" : "Crear una nueva tarea"}
        </h3>
        <div className="mb-4">
          <label
            htmlFor="boardTitle"
            className="block text-sm font-semibold mb-2">
            Título de la tarea
          </label>
          <input
            type="text"
            id="boardTitle"
            className={`shadow-sm appearance-none border rounded-md w-full py-3 px-4 leading-tight focus:outline-none focus:ring-2 ${
              error
                ? "border-error focus:ring-error"
                : "focus:ring-blue-500 focus:border-transparent"
            }`}
            placeholder="Ej. Planificación del Proyecto X"
            value={newTask.Title}
            onChange={(e) => handleTitleChange(e)}
            required
            autoFocus
            minLength={3}
          />
          {error && (
            <p className="mt-1 text-error text-sm font-semibold">{error}</p>
          )}
        </div>
        <div className="modal-action">
          <button
            onClick={handleAddTask}
            className="btn btn-outline btn-xs  text-xl py-6">
            Cancelar
          </button>
          <button
            onClick={(e) => handleCreateTask(e)}
            className="btn btn-outline btn-xs  text-xl py-6">
            {isEdit ? "Actualizar tarea" : "Crear tarea"}
          </button>
        </div>
      </div>
    </dialog>
  );
};
