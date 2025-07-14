import { useNavigate } from "react-router-dom";
import type { Board } from "../interface/BoardInterface";
import { useSelecedBoard } from "../contexts/BoardContext";


export const CardBoard = (board: Board) => {
  const navigate = useNavigate();

  const {setSelectedBoard} = useSelecedBoard();

  const handleBoardClick = () => {
    setSelectedBoard(board);
     navigate(`/board`);
  }

  return(
    <button 
      onClick={() => {handleBoardClick()}}
      className="card bg-blue-100 p-5 rounded-lg shadow-xl hover:shadow-2xl 
        transform hover:-translate-y-1 transition duration-300 ease-in-out 
        cursor-pointer border-l-4 border-blue-500 text-left w-full"
    >
      <div className="card-body p-0">
        <h3 className="card-title text-blue-800 mb-2">{board.Title}</h3>
        <p className="text-gray-700 text-sm">
          {board.description || "Sin descripción"}
        </p>
      </div>
    </button>
  )
  ;
};
