// Column.tsx
import { useDrop } from "react-dnd";

import type { Task } from "../../interface/BoardInterface";
import { Card } from "../task/Card";
import { useEffect, useState } from "react";
import { useTask } from "../../hooks/useTask";
import { CreateTask } from "../task/CreateTask";


interface ColumnProps {
  title: string;
  columnId: string;
  tasks: Task[];
  moveTask: (id: string, newColumnId: string) => void;
}

export const Column = ({ title, columnId, tasks, moveTask }: ColumnProps) => {


const {createTask} = useTask();

const [showCreateTask, setShowCreateTask] = useState(false);
const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks);
  
const addTask = async (newTask: Task) => {

  const data = await createTask({
      Title: newTask.Title!,
      columnId: columnId,
    });
  setFilteredTasks((prev) => [...prev, { 
    Id: data.Id,
    Title: newTask.Title!,
    columnId: columnId,
  }]);



  };
const handleAddTask = () => {
    setShowCreateTask(!showCreateTask);
  };

  const [{ isOver }, drop] = useDrop({
    accept: "CARD",
    drop: (item: { id: string }) => moveTask(item.id, columnId),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });
  
  useEffect(() => {
    setFilteredTasks(tasks.filter((task) => String(task.columnId) === String(columnId)));
  }, [tasks, columnId]);


  const lightBg = isOver ? "bg-blue-100" : "bg-base-300";


  return (
    <>
      <div
        ref={(node) => {
          if (node) drop(node);
        }}
        className={`min-w-[250px] md:min-w-[300px] lg:min-w-[350px] flex-shrink-0 p-4 rounded-lg shadow-md min-h-[300px] ${lightBg} flex flex-col justify-between`}
>
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        {filteredTasks.map((task) => (
          <Card key={task.Id} id={task.Id} title={task.Title} />
        ))}
        <div className="mt-4 ">
          <button onClick={handleAddTask} className="btn btn-primary btn-sm w-full">+ Agregar tarea</button>
      </div>
        </div>
      {showCreateTask && (
        <CreateTask
          handleAddTask={handleAddTask} addTask={addTask} selectedColumn={{ Id: columnId }}/>)}
    </>
  );
};
