import { useEffect, useState } from "react";
import { CardBoard } from "../components/CardBoard";
import { CreateBoard } from "../components/CreateBoard";
import type { Board } from "../interface/BoardInterface";

export const PrincipalPage = () => {
  const [boards, setBoards] = useState<Board[]>([]);
  const [showCreateBoard, setShowCreateBoard] = useState(false);


  const fetchBoards = () => {
    const boardData: Board[] = [
      { id: "1", title: "Tablero 1", description: "Descripción del Tablero 1" },
      { id: "2", title: "Tablero 2", description: "Descripción del Tablero 2" },
      { id: "3", title: "Tablero 3", description: "Descripción del Tablero 3" },
      { id: "4", title: "Tablero 4", description: "Descripción del Tablero 4" },
      { id: "5", title: "Tablero 5", description: "Descripción del Tablero 5" },
      { id: "6", title: "Tablero 6", description: "Descripción del Tablero 6" },
      { id: "7", title: "Tablero 7", description: "Descripción del Tablero 7" },
    ];
    try {
      setBoards(boardData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  const handleAddBoard = () => {
     setShowCreateBoard((prev) => !prev);
  };
  

  return (
    <>
      <div className="card bg-base-100 shadow-sm min-h-[60vh] opacity-90">
        <div className="card-body">
          <div className="flex justify-between items-center py-6 md:pl-4 md:pr-4">
            <h2 className="card-title text-2xl md:text-3xl">Mis tableros</h2>
            <button
              className="btn btn-outline btn-xs btn-primary text-xl py-6"
              onClick={handleAddBoard}>
              + Añadir tablero
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {boards.map((board) => (
              <CardBoard
                key={board.id}
                id={board.id}
                title={board.title}
                description={board.description}
              />
            ))}
          </div>
        </div>
      </div>

      {showCreateBoard && <CreateBoard handleAddBoard={handleAddBoard} setBoards={setBoards} />}
    </>
  );
};
