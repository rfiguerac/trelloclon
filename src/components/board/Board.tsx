import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useEffect, useState, useMemo } from "react";
import { Column } from "../column/Column";
import type { Column as Columna, Task } from "../../interface/BoardInterface";
import { useColumn } from "../../hooks/useColumn";
import { useSelecedBoard } from "../../contexts/BoardContext";
import { useTask } from "../../hooks/useTask";
import { CreateColumn } from "../column/CreateColumn";
import { useToast } from "../../contexts/ToastContext";

interface BoardProps {
  showCreateColumn: boolean;
  handleAddColumn: () => void;
}

export const Board = ({ showCreateColumn, handleAddColumn }: BoardProps) => {
  const { createColumn } = useColumn();

  const { showToast } = useToast();

  const { selectedBoard, selectColumn } = useSelecedBoard();

  const [columns, setColumns] = useState<Columna[]>([]);
  const { getAllColumn } = useColumn();
  const { updateTask } = useTask();

  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchColumns = async () => {
    const columnData = await getAllColumn();
    setColumns(columnData);
  };

  const fetchTasks = async () => {
    const { getAllTasks } = useTask();
    const taskData = await getAllTasks();
    setTasks(taskData);
  };

  useEffect(() => {
    fetchColumns();
    fetchTasks();
  }, []);

  const addColumn = async (newColumn: Omit<Columna, "Id">) => {
    try {
      const data = await createColumn({
        Title: newColumn.Title!,
        boardId: selectedBoard.Id,
      });
      setColumns((prev) => [
        ...prev,
        {
          Id: data.Id,
          Title: newColumn.Title!,
          boardId: selectedBoard.Id,
        },
      ]);
      showToast("nueva columna agregada", "success");
    } catch (error) {
      showToast("error al crear la columna", "error");
    }
  };

  const handleUpdateTask = async (task: any) => {
    const data = await updateTask(task);
    return data;
  };

  const moveTask = (id: string, newColumnId: string) => {
    const taskToUpdate = tasks.find((task) => String(task.Id) === String(id));

    handleUpdateTask({
      Id: taskToUpdate?.Id,
      Title: taskToUpdate?.Title,
      columnId: newColumnId,
    });

    setTasks((prev) =>
      prev.map((task) =>
        String(task.Id) === String(id)
          ? { ...task, columnId: newColumnId }
          : task
      )
    );
  };

  const filteredColumns = useMemo(() => {
    if (!selectedBoard.Id) return [];
    return columns.filter(
      (column) => String(column.boardId) === String(selectedBoard.Id)
    );
  }, [columns, selectedBoard]);

  useEffect(() => {
    selectColumn(filteredColumns);
  }, [filteredColumns]);

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <div className="flex flex-nowrap gap-4 p-6">
          {filteredColumns.map((column) => (
            <Column
              key={column.Id}
              title={column.Title}
              columnId={column.Id}
              tasks={tasks}
              moveTask={moveTask}
            />
          ))}
        </div>
      </DndProvider>
      {showCreateColumn && (
        <CreateColumn handleAddColumn={handleAddColumn} addColumn={addColumn} />
      )}
    </>
  );
};
