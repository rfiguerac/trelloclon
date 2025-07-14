// Board.tsx
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useEffect, useState } from "react";
import { Column } from "./Column";
import type {Column as Columnas, Task} from "../interface/BoardInterface";
import { useColumn } from "../hooks/useColumn";
import { useSelecedBoard } from "../contexts/BoardContext";
import { useTask } from "../hooks/useTask";



export const Board = () => {

const {selectedBoard} = useSelecedBoard();

const [columns, setColumns] = useState<Columnas[]>([]);
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


  const [tasks, setTasks] = useState<Task[]>([]);


  const handleUpdateTask = async(task: any) => {
    
    const data = await updateTask(task);
    
    return data;
  }

  const moveTask = (id: string, newColumnId: string) => {

    const taskToUpdate = tasks.find((task) => task.Id === id);

    const response = handleUpdateTask({
      Id: taskToUpdate?.Id,
      Title: taskToUpdate?.Title,
      columnId: newColumnId,
    });

    console.log(response.then((res) => res));

    setTasks((prev) =>
      prev.map((task) =>
        task.Id === id ? { ...task, columnId: newColumnId } : task
      )
    );
  };


  const filteredColumns = columns.filter((column) => column.boardId === String(selectedBoard.Id));



  return (
    <DndProvider backend={HTML5Backend}>
    
      <div className="flex gap-4 p-6">
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
  );
};
