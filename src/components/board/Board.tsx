import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useEffect, useMemo } from "react";
import { Column } from "../column/Column";
import { CreateColumn } from "../column/CreateColumn";

import { useColumnStore } from "../../store/columnStore";
import { useBoardStore } from "../../store/boardStore";
import { useTaskStore } from "../../store/taskStore";
import { useToast } from "../../contexts/ToastContext";

interface BoardProps {
  showCreateColumn: boolean;
  handleCloseModal: () => void;
}

export const Board = ({ showCreateColumn, handleCloseModal }: BoardProps) => {
  const { showToast } = useToast();
  const editTask = useTaskStore((s) => s.editTask);
  const columns = useColumnStore((s) => s.columns);
  const fetchColumns = useColumnStore((s) => s.fetchColumns);
  const { selectedBoard } = useBoardStore();

  const tasks = useTaskStore((s) => s.tasks);
  const fetchTasks = useTaskStore((s) => s.fetchTasks);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  useEffect(() => {
    fetchColumns();
  }, [fetchColumns]);

  const moveTask = async (id: string, newColumnId: string) => {
    const taskToUpdate = tasks.find((task) => String(task.Id) === String(id));

    if (taskToUpdate) {
      try {
        await editTask({
          Id: taskToUpdate.Id,
          Title: taskToUpdate.Title,
          columnId: newColumnId,
        });
        showToast("Tarea movida con éxito", "success");
      } catch (error) {
        showToast("Error al mover la tarea", "error");
        console.error("Error al mover la tarea:", error);
      }
    }
  };

  const filteredColumns = useMemo(() => {
    if (!selectedBoard) return [];
    return columns.filter(
      (column) => String(column.boardId) === String(selectedBoard.Id)
    );
  }, [columns, selectedBoard]);

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <div className="flex flex-nowrap gap-4 p-6 items-start">
          {filteredColumns.map((column) => (
            <Column
              key={column.Id}
              title={column.Title}
              columnId={column.Id}
              tasks={tasks.filter(
                (task) => String(task.columnId) === String(column.Id)
              )}
              moveTask={moveTask}
            />
          ))}
        </div>
      </DndProvider>
      {showCreateColumn && <CreateColumn handleCloseModal={handleCloseModal} />}
    </>
  );
};
