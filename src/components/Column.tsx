// Column.tsx
import { useDrop } from "react-dnd";

import type { Task } from "../interface/BoardInterface";
import { Card } from "./Card";

interface ColumnProps {
  title: string;
  columnId: string;
  tasks: Task[];
  moveTask: (id: string, newColumnId: string) => void;
}

export const Column = ({ title, columnId, tasks, moveTask }: ColumnProps) => {

    

  const [{ isOver }, drop] = useDrop({
    accept: "CARD",
    drop: (item: { id: string }) => moveTask(item.id, columnId),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const filteredTasks = tasks.filter((task) => String(task.columnId) === String(columnId));

  const lightBg = isOver ? "bg-blue-100" : "bg-base-300";


  return (
    <>
      <div
        ref={(node) => {
          if (node) drop(node);
        }}
        className={`w-1/4 p-4 rounded-lg shadow-md min-h-[300px] ${lightBg} flex flex-col justify-between`}>
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        {filteredTasks.map((task) => (
          <Card key={task.id} id={task.id} title={task.title} />
        ))}
        <div className="mt-4 ">
          <button className="btn btn-primary btn-sm w-full">+ Agregar tarea</button>
      </div>
        </div>
    </>
  );
};
