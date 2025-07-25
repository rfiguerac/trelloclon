import { useSelecedBoard } from "../contexts/BoardContext";
import { useBoard } from "../hooks/useBoard";
import { useColumn } from "../hooks/useColumn";
import { useTask } from "../hooks/useTask";
import { useToast } from "../contexts/ToastContext";
import type { Task } from "../interface/BoardInterface";
import { useNavigate } from "react-router-dom";

interface ModalProps {
  handleShowModal: () => void;
  title: string;
  children?: React.ReactNode;
  columnId?: string;
  tasks?: Task[];
  typeToDelete: "board" | "column" | "task";
}

export const ModalDelete = ({
  children,
  title,
  typeToDelete,
  columnId,
  tasks,
  handleShowModal,
}: ModalProps) => {
  const { deleteBoard } = useBoard();
  const { deleteColumn } = useColumn();
  const { deleteTask } = useTask();
  const { showToast } = useToast();

  const navigate = useNavigate();

  const { selectedBoard, selectedColumn, selectedTask } = useSelecedBoard();

  const handleDeleteTask = () => {
    const tasksToDelete = typeToDelete === "task" ? tasks : selectedTask;
    if (!tasksToDelete || tasksToDelete.length === 0) return;
    tasksToDelete.forEach((task) => {
      deleteTask(task.Id);
    });
  };

  const handleDeleteColumn = () => {
    if (typeToDelete === "column" && columnId) {
      deleteColumn(columnId);
      return;
    }
    if (!selectedColumn || selectedColumn.length === 0) return;
    selectedColumn.forEach((column) => {
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
        navigate("/", { replace: true });
      }
      if (typeToDelete === "column") {
        handleDeleteColumn();
        return;
      }
      if (typeToDelete === "task") {
        handleDeleteTask();
        return;
      }

      showToast(`${title} eliminado correctamente`, "success");

      handleShowModal();
    } catch (error) {
      console.error("Error al eliminar:", error);
      showToast(`Hubo un error al eliminar ${title}`, "error");
    }
  };

  return (
    <div>
      <dialog open className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            ¿Estás seguro de eliminar {title}?
          </h3>
          <div className="mb-4">{children}</div>
          <div className="modal-action">
            <button
              onClick={handleShowModal}
              className="btn btn-outline btn-xs text-xl py-6">
              Cancelar
            </button>
            <button
              onClick={handleDelete}
              className="btn btn-outline btn-xs text-xl py-6">
              Eliminar
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};
