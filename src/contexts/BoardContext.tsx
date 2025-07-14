import { createContext, useContext, useState } from "react";
import type { Board } from "../interface/BoardInterface";

interface BoardContextType {
    selectedBoard: Board;
    setSelectedBoard: React.Dispatch<React.SetStateAction<Board>>;
    resetSelectedBoard: () => void;
}

const BoardContext = createContext<BoardContextType | undefined>(undefined);

export const BoardProvider = ({ children }: { children: React.ReactNode }) => {

    const initialBoards: Board = {
        Id: "",
        Title: "",
        description: "",
    };
  const [selectedBoard, setSelectedBoard] = useState<Board>(initialBoards);


    const resetSelectedBoard = () => {
        setSelectedBoard(initialBoards);
    };

  return (
    <BoardContext.Provider value={{ selectedBoard, setSelectedBoard, resetSelectedBoard }}>
      {children}
    </BoardContext.Provider>
  );
};


export const useSelecedBoard = () => {
  const context = useContext(BoardContext);
  if (!context) throw new Error("useTheme debe ser usado con un ThemeProvider");
  return context;
};
