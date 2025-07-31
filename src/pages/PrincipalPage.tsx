import { useEffect, useState } from "react";
import { CardBoard } from "../components/board/CardBoard";
import { CreateBoard } from "../components/board/CreateBoard";
import { useBoardStore } from "../store/boardStore";

export const PrincipalPage = () => {
  const [showCreateBoard, setShowCreateBoard] = useState(false);

  const boards = useBoardStore((state) => state.boards);
  const fetchBoards = useBoardStore((state) => state.fetchBoards);

  useEffect(() => {
    fetchBoards();
  }, [fetchBoards]);

  const handleAddBoard = () => {
    setShowCreateBoard((prev) => !prev);
  };

  return (
    <>
      <div className="card bg-base-100 shadow-sm min-h-[60vh] opacity-90">
        <div className="card-body">
          <div className="flex justify-between items-center py-6 md:pl-4 md:pr-4">
            <h2 className="card-title text-2xl md:text-5xl">Mis tableros</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {boards.map((board) => (
              <CardBoard
                key={board.Id}
                Id={board.Id}
                Title={board.Title}
                description={board.description}
              />
            ))}
            <button
              onClick={handleAddBoard}
              className="board-card flex items-center justify-center bg-gray-100 text-gray-600 rounded-lg
               hover:bg-gray-200 transition-colors duration-200 min-h-32 cursor-pointer shadow-md"
              style={{ boxShadow: "none" }}>
              <span className="text-2xl font-bold">+</span>
              <span className="text-lg ml-2">Crear nuevo tablero</span>
            </button>
          </div>
        </div>
      </div>

      {showCreateBoard && <CreateBoard handleAddBoard={handleAddBoard} />}
    </>
  );
};
