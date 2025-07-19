import { useState } from "react";
import type { Board } from "../../interface/BoardInterface";
import { useBoard } from "../../hooks/useBoard";

interface CreateBoardProps {
  handleAddBoard: () => void;
  setBoards: React.Dispatch<React.SetStateAction<Board[]>>;
}

export const CreateBoard = ({
  handleAddBoard,
  setBoards,
}: CreateBoardProps) => {
  
  
  const [newBoard, setNewBoard] = useState({
    title: "",
    description: "",
  });

  const {createBoard} = useBoard();
  const [error, setError] = useState("");
  

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewBoard((prev) => ({ ...prev, title: value }));

    if (value.trim().length < 3) {
      setError("El título debe tener al menos 3 caracteres.");
    } else {
      setError("");
    }
  };

  const handleCreateBoard = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newBoard.title.trim().length < 3) {
      setError("El título debe tener al menos 3 caracteres.");
      return;
    }

    const data = await createBoard({
      Title: newBoard.title,
      description: newBoard.description || "Sin descripción",
    });

    setBoards((prevBoards) => [
      ...prevBoards,
      {
        Id: data.Id,
        Title: newBoard.title,
        description: newBoard.description || "Sin descripción",
      },
    ]);
    handleAddBoard();
  };

  return(
    <dialog open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Crear Nuevo Tablero</h3>
                      <div className="mb-4">
            <label
              htmlFor="boardTitle"
              className="block text-sm font-semibold mb-2">
              Título del Tablero
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
              value={newBoard.title}
              onChange={(e) => handleTitleChange(e)}
              required
              autoFocus
              minLength={3}
            />
            {error && (
              <p className="mt-1 text-error text-sm font-semibold">{error}</p>
            )}
          </div>
          <div className="mb-6">
            <label
              htmlFor="boardDescription"
              className="block text-sm font-semibold mb-2">
              Descripción (Opcional)
            </label>
            <textarea
              id="boardDescription"
              className="shadow-sm appearance-none border rounded-md w-full py-3 px-4 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24 resize-none"
              placeholder="Una breve descripción de este tablero..."
              value={newBoard.description}
              onChange={(description) =>
                setNewBoard({
                  ...newBoard,
                  description: description.target.value,
                })
              }></textarea>
          </div>
            

            <div className="modal-action">
              <button
              onClick={handleAddBoard}
              className="btn btn-outline btn-xs text-xl py-6">
              Cancelar
            </button>
            <button
              onClick={(e) => handleCreateBoard(e)}
              className="btn btn-outline btn-xs  text-xl py-6">
              Crear tablero
            </button>
            </div>
          </div>
        </dialog>
  )

}