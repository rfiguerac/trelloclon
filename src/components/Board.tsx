// Board.tsx
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useState } from "react";
import { Column } from "./Column";

export type Status = "do" | "doing" | "done";

export interface Task {
  id: string;
  title: string;
  status: Status;
}

export const Board = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", title: "Tarea 1", status: "do" },
    { id: "2", title: "Tarea 2", status: "doing" },
    { id: "3", title: "Tarea 3", status: "done" },
  ]);

  const moveTask = (id: string, newStatus: Status) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
    
      <div className="flex gap-4 p-6">
        <Column title="Por hacer" status="do" tasks={tasks} moveTask={moveTask} />
        <Column title="En progreso" status="doing" tasks={tasks} moveTask={moveTask} />
        <Column title="Hecho" status="done" tasks={tasks} moveTask={moveTask} />
      </div>
    </DndProvider>
  );
};
