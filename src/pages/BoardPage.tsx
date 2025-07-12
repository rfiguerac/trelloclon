import { Link } from "react-router-dom";
import { Board } from "../components/Board";
import { useSelecedBoard } from "../contexts/BoardContext";

export const BoardPage = () => {
  const { selectedBoard } = useSelecedBoard();
  return (
    <div>
      <div className="card bg-base-100 shadow-sm min-h-[60vh] opacity-90">
        <div className="card-body">
          {selectedBoard.title.length ? (
            <>
              <div className="flex justify-between items-center py-6 md:pl-4 md:pr-4">
                <h2 className="card-title text-2xl md:text-3xl">
                  {selectedBoard.title}
                </h2>
                <button className="btn btn-outline btn-xs btn-primary text-xl py-6">
                  + Agregar Lista
                </button>
              </div>
              <Board />
            </>
          ) : (
            <div>
              <p className="text-center text-gray-500 text-2xl font-bold">
                Selecciona un tablero para comenzar
              </p>
              <Link to={"/"} className="btn btn-outline btn-xs btn-primary text-xl py-6">
                Volver a la página principal
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
