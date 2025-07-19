// Board.tsx
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useEffect, useState } from "react";
import { Column } from "../column/Column";
import type {Column as Columnas, Task} from "../../interface/BoardInterface";
import { useColumn } from "../../hooks/useColumn";
import { useSelecedBoard } from "../../contexts/BoardContext";
import { useTask } from "../../hooks/useTask";
import { CreateColumn } from "../column/CreateColumn";

interface BoardProps {
  showCreateColumn: boolean;
  handleAddColumn: () => void;
}

export const Board = ({showCreateColumn, handleAddColumn} : BoardProps) => {

const {selectedBoard} = useSelecedBoard();

const [columns, setColumns] = useState<Columnas[]>([]);
const [filteredColumns, setFilteredColumns] = useState<Columnas[]>([]);
const {getAllColumn} = useColumn();
const { updateTask } = useTask();

const fetchColumns = async () => {
    const columnData = await getAllColumn();
    setColumns(columnData);
}

const fetchTasks = async () => {
    const { getAllTasks } = useTask();
    const taskData = await getAllTasks();
    setTasks(taskData);
}

useEffect(() => {
    fetchColumns();
    fetchTasks();
}, []);

const addColumn = (newColumn: Columnas) => {
  setColumns((prev) => [...prev, newColumn]);
  setFilteredColumns((prev) => [...prev, newColumn]);
}


  const [tasks, setTasks] = useState<Task[]>([]);


  const handleUpdateTask = async(task: any) => {
    
    const data = await updateTask(task);
    
    return data;
  }

  const moveTask = (id: string, newColumnId: string) => {

    const taskToUpdate = tasks.find((task) => String(task.Id) === String(id));

    const response = handleUpdateTask({
      Id: taskToUpdate?.Id,
      Title: taskToUpdate?.Title,
      columnId: newColumnId,
    });


    setTasks((prev) =>
      prev.map((task) =>
        String(task.Id) === String(id)? { ...task, columnId: newColumnId } : task
      )
    );
  };


  const filterColumnsByBoard = () => {
    if (!selectedBoard.Id) {
      setFilteredColumns([]);
      return;
    }
    setFilteredColumns(columns.filter((column) => String(column.boardId) === String(selectedBoard.Id)));
  };  

  useEffect(() => {
    filterColumnsByBoard();
  }, [columns, selectedBoard]);







  return (
    <>
    <DndProvider backend={HTML5Backend}>
    
      <div className="flex flex-nowrap gap-4 p-6">
        {
          filteredColumns.map((column) => (
            <Column
            key={column.Id}
            title={column.Title}
            columnId={column.Id}
            tasks={tasks}
            moveTask={moveTask}
            />
          ))
        }
      </div>

    </DndProvider>
      {showCreateColumn && <CreateColumn handleAddColumn={handleAddColumn} addColumn={addColumn}/>}

</>
  );
};
