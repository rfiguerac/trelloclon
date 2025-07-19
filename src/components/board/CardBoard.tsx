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
      onClick={() => {handleBoardClick()}} key={board.Id} className="board-card bg-white rounded-lg shadow-md overflow-hidden cursor-pointer flex flex-col min-h-[120px] transform transition-all duration-200 hover:translate-y-[-5px] hover:shadow-xl">
              <div className={`card-header h-[60px] flex items-center justify-center text-white font-bold text-xl bg-cover bg-center ${bg}`}>
              </div>
              <div className="card-content p-4 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-1">{board.Title}</h3>
                  <p className="text-sm text-gray-600">{board.description}</p>
                </div>
               
              </div>
            </button>
  )

  // return(
  //   <button 
  //     onClick={() => {handleBoardClick()}}
  //     className="card bg-blue-100 p-5 rounded-lg shadow-xl hover:shadow-2xl 
  //       transform hover:-translate-y-1 transition duration-300 ease-in-out 
  //       cursor-pointer border-l-4 border-blue-500 text-left w-full"
  //   >
  //     <div className="card-body p-0">
  //       <h3 className="card-title text-blue-800 mb-2">{board.Title}</h3>
  //       <p className="text-gray-700 text-sm">
  //         {board.description || "Sin descripción"}
  //       </p>
  //     </div>
  //   </button>
  // )
  ;
};
