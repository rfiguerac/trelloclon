// Column.tsx
import { useDrop } from "react-dnd";
import { useState } from "react";

import type { Column as Columna, Task } from "../../interface/BoardInterface";
import { Card } from "../task/Card";
import { CreateTask } from "../task/CreateTask";
import { CreateColumn } from "./CreateColumn";
import { ModalDelete } from "../ModalDelete";

interface ColumnProps {
  title: string;
  columnId: string;
  tasks: Task[];
  moveTask: (taskId: string, columnId: string) => void;
}

export const Column = ({ title, columnId, tasks, moveTask }: ColumnProps) => {
  const [showEditColumn, setShowEditColumn] = useState(false);
  const [showDeleteColumn, setShowDeleteColumn] = useState(false);
  const [showCreateTask, setShowCreateTask] = useState(false);

  const isOpenModalTask = () => {
    setShowCreateTask(!showCreateTask);
  };

  const [{ isOver }, drop] = useDrop({
    accept: "CARD",
    drop: (item: { id: string }) => moveTask(item.id, columnId),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const handleDeleteColumn = () => {
    setShowDeleteColumn(!showDeleteColumn);
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
        className="w-[260px] min-w-[260px] md:min-w-[300px] lg:min-w-[350px] flex-shrink-0 p-4 rounded-xl border border-gray-300 bg-base-200 shadow-sm flex flex-col justify-start">
        <div
          className={`h-full w-full rounded-lg p-4 ${
            isOver ? "bg-blue-100" : "bg-base-200/90"
          } flex flex-col justify-start`}>
          <div className="flex flex-col gap-2 justify-between mb-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold break-words whitespace-normal">
                {title}
              </h2>

              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn m-1 btn-xs  py-4 rounded-lg px-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-ellipsis-icon lucide-ellipsis">
                    <circle cx="12" cy="12" r="1" />
                    <circle cx="19" cy="12" r="1" />
                    <circle cx="5" cy="12" r="1" />
                  </svg>
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                  <li>
                    <button className="text-sm" onClick={handleEditColumn}>
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
                      </svg>{" "}
                      Editar columna
                    </button>
                  </li>
                  <li>
                    <button
                      className="text-error text-sm"
                      onClick={handleDeleteColumn}>
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
                      Eliminar columna
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {tasks.map((task) => (
            <Card key={task.Id} task={task} />
          ))}

          <div className="mt-auto">
            <button
              onClick={isOpenModalTask}
              className="mt-5 w-full text-base text-base-400 text-left hover:bg-base-300 px-2 py-1 rounded">
              + Agregar tarea
            </button>
          </div>
        </div>
      </div>

      {showCreateTask && (
        <CreateTask
          handleAddTask={isOpenModalTask}
          selectedColumn={{ Id: columnId }}
        />
      )}

      {showEditColumn && (
        <CreateColumn
          handleCloseModal={() => setShowEditColumn(false)}
          isEdit={true}
          columnToEdit={{ Id: columnId, Title: title } as Columna}
        />
      )}

      {showDeleteColumn && (
        <ModalDelete
          typeToDelete="column"
          columnId={columnId}
          handleShowModal={handleDeleteColumn}
          title={title}
        />
      )}
    </>
  );
};
