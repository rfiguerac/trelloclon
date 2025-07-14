import { useEffect, useState } from "react";
import { CardBoard } from "../components/CardBoard";
import { CreateBoard } from "../components/CreateBoard";
import type { Board } from "../interface/BoardInterface";
import { useBoard } from "../hooks/useBoard";

export const PrincipalPage = () => {
  const [boards, setBoards] = useState<Board[]>([]);
  const [showCreateBoard, setShowCreateBoard] = useState(false);

  const {getAllBoards} = useBoard();

 
  const fetchBoards = async() => {
    try {
      const boardData = await getAllBoards();
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
                key={board.Id}
                Id={board.Id}
                Title={board.Title}
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
