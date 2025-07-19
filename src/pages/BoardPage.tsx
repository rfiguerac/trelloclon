import { Link } from "react-router-dom";
import { Board } from "../components/board/Board";
import { useSelecedBoard } from "../contexts/BoardContext";
import { useState } from "react";

export const BoardPage = () => {
  const { selectedBoard } = useSelecedBoard();

  const [showCreateColumn, setShowCreateColumn] = useState(false);

  const handleAddColumn = () => {
    setShowCreateColumn((prev) => !prev);
  };

  return (
    <div>
      <div className="card bg-base-100 shadow-sm min-h-[60vh] opacity-90">
        <div className="card-body">
          {selectedBoard.Title.length ? (
            <>
              <div className="flex justify-between items-center py-6 md:pl-4 md:pr-4">
                <Link
                  to={"/"}
                  className="">
                <h2 className="card-title text-2xl md:text-3xl font-bold">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-arrow-left-icon lucide-arrow-left">
                    <path d="m12 19-7-7 7-7" />
                    <path d="M19 12H5" />
                  </svg>
                  Tableros
                </h2>
                </Link>
                <h2 className="card-title text-3xl md:text-5xl font-bold">
                  {selectedBoard.Title}
                </h2>
                <button
                  onClick={handleAddColumn}
                  className="btn btn-outline btn-xs btn-primary text-xl py-6">
                  + Agregar Lista
                </button>
              </div>
              <div className="overflow-x-auto">
                <Board
                  showCreateColumn={showCreateColumn}
                  handleAddColumn={handleAddColumn}
                />
              </div>
            </>
          ) : (
            <div>
              <p className="text-center text-gray-500 text-2xl font-bold">
                Selecciona un tablero para comenzar
              </p>
              <Link
                to={"/"}
                className="btn btn-outline btn-xs btn-primary text-xl py-6">
                Volver a la página principal
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
