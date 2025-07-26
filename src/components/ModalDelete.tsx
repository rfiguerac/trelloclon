import { useSelecedBoard } from "../contexts/BoardContext";
import { useBoard } from "../hooks/useBoard";
import { useColumn } from "../hooks/useColumn";
import { useTask } from "../hooks/useTask";
import type { Task } from "../interface/BoardInterface";

interface ModalProps {
  handleShowModal: () => void;
  title: string;
  children?: React.ReactNode;
  columnId?: string;
  task?: Task[];
  typeToDelete: "board" | "column" | "task";
}

export const ModalDelete = ({
  children,
  title,
  typeToDelete,
  columnId,
  task,
  handleShowModal,
}: ModalProps) => {
  const { deleteBoard } = useBoard();
  const { deleteColumn } = useColumn();
  const { deleteTask } = useTask();

  const { selectedBoard, selectedColumn, selectedTask } = useSelecedBoard();

  const handleDeleteTask = () => {
    let taskToDelete: Task[] = [];

    if (typeToDelete === "task") {
      taskToDelete = task!;
    } else {
      taskToDelete = selectedTask!;
    }
    if (taskToDelete.length === 0) return;
    taskToDelete.forEach((task) => {
      deleteTask(task.Id);
    });
  };

  const handleDeleteColumn = () => {
    if (typeToDelete === "column") {
      deleteColumn(columnId!);
      return;
    }
    if (selectedColumn?.length === 0) return;
    selectedColumn?.forEach((column) => {
      deleteColumn(column.Id);
    });
  };

  const handleDeleteBoard = () => {
    deleteBoard(selectedBoard.Id);
  };

  const handleDelete = () => {
    try {
      if (typeToDelete === "board") {
        handleDeleteBoard();
        handleDeleteColumn();
        handleDeleteTask();
      }
      if (typeToDelete === "column") {
      }
      if (typeToDelete === "task") {
      }

      handleShowModal();
    } catch (error) {}
  };

  return (
    <div>
      <dialog open className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            ¿Esta seguro de eliminar {title} ?
          </h3>
          <div className="mb-4">{children}</div>
          <div className="modal-action">
            <button
              onClick={handleShowModal}
              className="btn btn-outline btn-xs  text-xl py-6">
              Cancelar
            </button>
            <button
              onClick={handleDelete}
              className="btn btn-outline btn-xs  text-xl py-6">
              Eliminar
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};
