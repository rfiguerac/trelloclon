import { useToast } from "../contexts/ToastContext";
import { useNavigate } from "react-router-dom";
import { useBoardStore } from "../store/boardStore";
import { useColumnStore } from "../store/columnStore";
import { useTaskStore } from "../store/taskStore";

interface ModalProps {
  handleShowModal: () => void;
  title: string;
  children?: React.ReactNode;
  columnId?: string;
  taskId?: string;
  typeToDelete: "board" | "column" | "task";
}

export const ModalDelete = ({
  children,
  title,
  typeToDelete,
  columnId,
  taskId,
  handleShowModal,
}: ModalProps) => {
  const { removeBoard, selectedBoard } = useBoardStore();
  const { removeColumn, columns } = useColumnStore();
  const { removeTask, tasks } = useTaskStore();
  const { showToast } = useToast();

  const navigate = useNavigate();

  const handleDeleteBoard = async () => {
    if (!selectedBoard) return;

    const columnsToDelete = columns.filter(
      (c) => c.boardId === selectedBoard.Id
    );
    const tasksToDelete = tasks.filter((t) =>
      columnsToDelete.some((c) => c.Id === t.columnId)
    );

    for (const task of tasksToDelete) {
      await removeTask(task.Id);
    }
    for (const column of columnsToDelete) {
      await removeColumn(column.Id);
    }

    await removeBoard(selectedBoard.Id);
  };

  const handleDeleteColumn = async (id: string) => {
    const tasksToDelete = tasks.filter((t) => t.columnId === id);
    for (const task of tasksToDelete) {
      await removeTask(task.Id);
    }
    await removeColumn(id);
  };

  const handleDeleteTask = async (id: string) => {
    await removeTask(id);
  };

  const handleDelete = async () => {
    try {
      if (typeToDelete === "board") {
        await handleDeleteBoard();
        showToast(
          `Tablero "${selectedBoard?.Title}" eliminado correctamente`,
          "success"
        );
        navigate("/", { replace: true });
      } else if (typeToDelete === "column" && columnId) {
        await handleDeleteColumn(columnId);
        showToast(`Columna eliminada correctamente`, "success");
      } else if (typeToDelete === "task" && taskId) {
        await handleDeleteTask(taskId);
        showToast(`Tarea eliminada correctamente`, "success");
      }

      handleShowModal();
    } catch (error) {
      showToast(`Hubo un error al eliminar ${title}`, "error");
      throw new Error(`Hubo un error al eliminar ${title}`);
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
