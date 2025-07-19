import { useState } from "react";
import { useColumn } from "../../hooks/useColumn";
import { useSelecedBoard } from "../../contexts/BoardContext";
import type { Column } from "../../interface/BoardInterface";

interface CreateColumnProps {
  handleAddColumn: () => void;
  addColumn: (newColumn: Column) => void;
}

export const CreateColumn = ({
  handleAddColumn,
  addColumn,

}: CreateColumnProps) => {
  
  
  const [newColumn, setNewColumn] = useState<Partial<Column>>({
    Title: "",
    boardId: "",
  });

  const {createColumn} = useColumn();
  const {selectedBoard} = useSelecedBoard();


  const [error, setError] = useState("");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewColumn((prev) => ({ ...prev, Title: value }));

    if (value.trim().length < 3) {
      setError("El título debe tener al menos 3 caracteres.");
    } else {
      setError("");
    }
  };

  const handleCreateColumn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newColumn.Title!.trim().length < 3) {
      setError("El título debe tener al menos 3 caracteres.");
      return;
    }
    if (!selectedBoard.Id) {
      setError("Debe seleccionar un tablero antes de crear una columna.");
      return;
    }
    
    const data = await createColumn({
      Title: newColumn.Title!,
      boardId: selectedBoard.Id,
    });

    addColumn(
       {
        Id: data.Id,
        Title: newColumn.Title!,
        boardId: selectedBoard.Id,
      },
    );
    handleAddColumn();
  };

  return(
    <dialog open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Crear una nueva lista</h3>
            <div className="mb-4">
            <label
              htmlFor="boardTitle"
              className="block text-sm font-semibold mb-2">
              Título de la Lista
            </label>
            <input
              type="text"
              id="boardTitle"
              className={`shadow-sm appearance-none border rounded-md w-full py-3 px-4 leading-tight focus:outline-none focus:ring-2 ${
                error
                  ? "border-error focus:ring-error"
                  : "focus:ring-blue-500 focus:border-transparent"
              }`}
              placeholder="Ej. Planificación del Proyecto X"
              value={newColumn.Title}
              onChange={(e) => handleTitleChange(e)}
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
              onClick={handleAddColumn}
              className="btn btn-outline btn-xs  text-xl py-6">
              Cancelar
            </button>
            <button
              onClick={(e) => handleCreateColumn(e)}
              className="btn btn-outline btn-xs  text-xl py-6">
              Crear Lista
            </button>
            </div>
          </div>
        </dialog>
  )

};
