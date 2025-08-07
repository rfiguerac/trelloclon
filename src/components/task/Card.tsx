import { useState } from "react";
import { useDrag } from "react-dnd";
import { CreateTask } from "./CreateTask";
import type { Task } from "../../interface/BoardInterface";
import { ModalDelete } from "../ModalDelete";

interface CardProps {
  task: Task;
}

export const Card = ({ task }: CardProps) => {
  const { Id: id, Title, columnId } = task;
  const [showEditTask, setShowEditTask] = useState(false);
  const [showDeleteTask, setShowDeleteTask] = useState(false);

  const [{ isDragging }, drag] = useDrag({
    type: "CARD",
    item: { id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const handleEditTask = () => setShowEditTask(!showEditTask);
  const handleDeleteTask = () => setShowDeleteTask(!showDeleteTask);

  return (
    <>
      <div
        ref={(node) => {
          if (node) drag(node);
        }}
        className={`group p-4 mb-2 rounded-lg bg-base-100 border border-base-200 ring-1 ring-inset ring-base-300 hover:ring-base-400 transition-all duration-200 cursor-move border-l-4 border-l-primary ${
          isDragging ? "opacity-50" : "opacity-100"
        }`}>
        <div className="flex justify-between items-start">
          <h3 className="text-base font-medium max-w-[200px] break-words whitespace-normal">
            {Title}
          </h3>

          <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={handleEditTask}
              className="btn btn-xs btn-ghost p-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="lucide lucide-pencil">
                <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
                <path d="m15 5 4 4" />
              </svg>
            </button>

            <button
              onClick={handleDeleteTask}
              className="btn btn-xs btn-ghost p-1 text-error hover:bg-error/10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="lucide lucide-trash">
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                <path d="M3 6h18" />
                <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {showEditTask && (
        <CreateTask
          handleAddTask={handleEditTask}
          selectedColumn={{ Id: columnId }}
          isEdit={true}
          taskToEdit={task}
        />
      )}

      {showDeleteTask && (
        <ModalDelete
          typeToDelete="task"
          title={Title}
          handleShowModal={handleDeleteTask}
          taskId={id}
        />
      )}
    </>
  );
};
