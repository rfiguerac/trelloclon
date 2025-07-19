import { useNavigate } from "react-router-dom";
import type { Board } from "../../interface/BoardInterface";
import { useSelecedBoard } from "../../contexts/BoardContext";
import { getGradientBg } from "../../utils/gradients";


export const CardBoard = (board: Board) => {
  const navigate = useNavigate();

  const {setSelectedBoard} = useSelecedBoard();

  const handleBoardClick = () => {
    setSelectedBoard(board);
     navigate(`/board`);
  }

  const bg = getGradientBg();

  return(
    <button 
      onClick={handleBoardClick} key={board.Id} className="board-card bg-base-200 rounded-lg shadow-md overflow-hidden cursor-pointer flex flex-col min-h-[120px] transform transition-all duration-200 hover:translate-y-[-5px] hover:shadow-xl">
              <div className={`card-header h-[60px] flex items-center justify-center font-bold text-xl bg-cover bg-center ${bg}`}>
              </div>
              <div className="card-content p-4 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-lg font-medium mb-1">{board.Title}</h3>
                  <p className="text-sm">{board.description}</p>
                </div>
               
              </div>
            </button>
  )
};
