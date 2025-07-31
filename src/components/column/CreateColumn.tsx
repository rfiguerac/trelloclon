import { useState, useEffect } from "react";

import type { Column } from "../../interface/BoardInterface";

import { useToast } from "../../contexts/ToastContext";
import { useColumnStore } from "../../store/columnStore";
import { useBoardStore } from "../../store/boardStore";

interface CreateColumnProps {
  handleCloseModal: () => void;
  createColumn?: (newColumn: Omit<Column, "Id">) => void;
  isEdit?: boolean;
  columnToEdit?: Column;
}

export const CreateColumn = ({
  handleCloseModal,
  isEdit = false,
  columnToEdit,
}: CreateColumnProps) => {
  const { selectedBoard } = useBoardStore();
  const { addColumn, editColumn } = useColumnStore();
  const { showToast } = useToast();
  const [error, setError] = useState("");

  const [newColumn, setNewColumn] = useState<Omit<Column, "Id">>({
    Title: "",
    boardId: "",
  });

  useEffect(() => {
    if (isEdit && columnToEdit) {
      setNewColumn({
        Title: columnToEdit.Title,
        boardId: columnToEdit.boardId,
      });
    }
  }, [isEdit, columnToEdit]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewColumn((prev) => ({ ...prev, Title: value }));

    if (value.trim().length < 3) {
      setError("El título debe tener al menos 3 caracteres.");
    } else {
      setError("");
    }
  };

  const handleSubmit = async () => {
    if (newColumn.Title.trim().length < 3) {
      setError("El título debe tener al menos 3 caracteres.");
      return;
    }

    try {
      if (isEdit && columnToEdit && selectedBoard) {
        editColumn({
          Id: columnToEdit.Id,
          Title: newColumn.Title,
          boardId: selectedBoard.Id,
        });
        showToast("lista actualizada", "success");
      } else {
        if (!selectedBoard) return;
        addColumn({
          Title: newColumn.Title,
          boardId: selectedBoard.Id,
        });

        showToast("lista creada", "success");
      }
    } catch (error) {
      showToast("error al crear la lista", "error");
    }
    handleCloseModal();
  };

  return (
    <dialog open className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">
          {isEdit ? "Editar lista" : "Crear una nueva lista"}
        </h3>
        <div className="mb-4">
          <label
            htmlFor="columnTitle"
            className="block text-sm font-semibold mb-2">
            Título de la Lista
          </label>
          <input
            type="text"
            id="columnTitle"
            className={`shadow-sm appearance-none border rounded-md w-full py-3 px-4 leading-tight focus:outline-none focus:ring-2 ${
              error
                ? "border-error focus:ring-error"
                : "focus:ring-blue-500 focus:border-transparent"
            }`}
            placeholder="Ej. Planificación del Proyecto X"
            value={newColumn.Title}
            onChange={handleTitleChange}
            required
            autoFocus
            minLength={3}
          />
          {error && (
            <p className="mt-1 text-error text-sm font-semibold">{error}</p>
          )}
        </div>
        <div className="modal-action">
          <button
            onClick={handleCloseModal}
            className="btn btn-outline btn-xs text-xl py-6">
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="btn btn-outline btn-xs text-xl py-6">
            {isEdit ? "Actualizar lista" : "Crear lista"}
          </button>
        </div>
      </div>
    </dialog>
  );
};
