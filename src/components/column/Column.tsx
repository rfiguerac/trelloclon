// Column.tsx
import { useDrop } from "react-dnd";

import type { Column as Columna, Task } from "../../interface/BoardInterface";
import { Card } from "../task/Card";
import { useEffect, useState } from "react";
import { CreateTask } from "../task/CreateTask";

import { useToast } from "../../contexts/ToastContext";
import { CreateColumn } from "./CreateColumn";
import { useTaskStore } from "../../store/taskStore";

interface ColumnProps {
  title: string;
  columnId: string;
  tasks: Task[];
  moveTask: (taskId: string, columnId: string) => void;
}

export const Column = ({ title, columnId, tasks, moveTask }: ColumnProps) => {
  const { addTask } = useTaskStore();

  const { showToast } = useToast();

  const [showEditColumn, setShowEditColumn] = useState(false);
  const [showDeleteColumn, setShowDeleteColumn] = useState(false);

  const [showCreateTask, setShowCreateTask] = useState(false);

  const isOpenModalTask = () => {
    setShowCreateTask(!showCreateTask);
  };

  const handleAddTask = async (newTask: Task) => {
    try {
      await addTask({
        Title: newTask.Title!,
        columnId: columnId,
      });
      showToast(`nueva tarea  agregada `, "success");
    } catch (error) {
      showToast("error al crear la tarea", "error");
    }
  };

  const [{ isOver }, drop] = useDrop({
    accept: "CARD",
    drop: (item: { id: string }) => moveTask(item.id, columnId),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const lightBg = isOver ? "bg-blue-100" : "bg-base-300";

  const handleDeleteColumn = () => {
    alert("Eliminar columna");
  };

  const handleEditColumn = () => {
    setShowEditColumn(!showEditColumn);
  };

  return (
    <>
      <div
        ref={(node) => {
          if (node) drop(node);
        }}
        className={`w-[260px] min-w-[260px] md:min-w-[300px] lg:min-w-[350px] flex-shrink-0 p-4 rounded-lg shadow-md min-h-[300px] ${lightBg} flex flex-col justify-between`}>
        <div className="flex flex-col gap-2 justify-between mb-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold break-words whitespace-normal">
              {title}
            </h2>

            <div className="flex gap-2">
              <button className="btn btn-sm" onClick={handleEditColumn}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="lucide lucide-pencil-icon lucide-pencil">
                  <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
                  <path d="m15 5 4 4" />
                </svg>
              </button>
              <button className="btn btn-sm " onClick={handleDeleteColumn}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="lucide lucide-trash-icon lucide-trash">
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                  <path d="M3 6h18" />
                  <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {tasks.map((task) => (
          <Card key={task.Id} id={task.Id} title={task.Title} />
        ))}
        <div className="mt-4 ">
          <button
            onClick={isOpenModalTask}
            className="btn btn-outline btn-lg w-full text-lg">
            + Agregar tarea
          </button>
        </div>
      </div>
      {showCreateTask && (
        <CreateTask
          handleAddTask={isOpenModalTask}
          addTask={addTask}
          selectedColumn={{ Id: columnId }}
        />
      )}
      {showEditColumn && (
        <CreateColumn
          handleCloseModal={() => setShowEditColumn(false)}
          isEdit={true}
          columnToEdit={{ Id: columnId, Title: title } as Columna}
        />
      )}{" "}
      {showDeleteColumn && <div>Eliminar columna</div>}
    </>
  );
};
