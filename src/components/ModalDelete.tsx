import { useToast } from "../contexts/ToastContext";
import type { Task } from "../interface/BoardInterface";
import { useNavigate } from "react-router-dom";
import { useBoardStore } from "../store/boardStore";
import { useColumnStore } from "../store/columnStore";
import { useTaskStore } from "../store/taskStore";

interface ModalProps {
  handleShowModal: () => void;
  title: string;
  children?: React.ReactNode;
  columnId?: string;
  typeToDelete: "board" | "column" | "task";
}

export const ModalDelete = ({
  children,
  title,
  typeToDelete,
  columnId,
  handleShowModal,
}: ModalProps) => {
  const { removeBoard, selectedBoard } = useBoardStore();
  const { removeColumn, columns } = useColumnStore();
  const { removeTask, tasks } = useTaskStore();
  const { showToast } = useToast();

  const navigate = useNavigate();

  const handleDeleteTask = () => {
    const selectedTask = tasks?.filter((task) => task.columnId === columnId);
    const tasksToDelete = typeToDelete === "task" ? tasks : selectedTask;
    if (!tasksToDelete || tasksToDelete.length === 0) return;
    tasksToDelete.forEach((task) => {
      removeTask(task.Id);
    });
  };

  const handleDeleteColumn = () => {
    if (typeToDelete === "column" && columnId) {
      removeColumn(columnId);
      return;
    }
    const selectedColumn = columns.filter(
      (column) => column.boardId === selectedBoard?.Id
    );
    if (!selectedColumn || selectedColumn.length === 0) return;
    selectedColumn.forEach((column) => {
      removeBoard(column.Id);
    });
  };

  const handleDeleteBoard = () => {
    if (!selectedBoard) return;
    removeBoard(selectedBoard.Id);
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
