import { createContext, useContext, useState } from "react";
import type { Board, Column, Task } from "../interface/BoardInterface";

interface BoardContextType {
  selectedBoard: Board;
  setSelectedBoard: React.Dispatch<React.SetStateAction<Board>>;
  resetSelectedBoard: () => void;
  selectColumn: (column: Column[]) => void;
  selectTask: (task: Task[]) => void;
  selectedColumn?: Column[];
  selectedTask?: Task[];
}

const BoardContext = createContext<BoardContextType | undefined>(undefined);

export const BoardProvider = ({ children }: { children: React.ReactNode }) => {
  const initialBoards: Board = {
    Id: "",
    Title: "",
    description: "",
  };
  const [selectedBoard, setSelectedBoard] = useState<Board>(initialBoards);
  const [selectedColumn, setSelectedColumn] = useState<Column[]>();
  const [selectedTask, setSelectedTask] = useState<Task[]>();

  const resetSelectedBoard = () => {
    setSelectedBoard(initialBoards);
  };

  const selectColumn = (column: Column[]) => {
    setSelectedColumn(column);
  };

  const selectTask = (task: Task[]) => {
    setSelectedTask(task);
  };

  return (
    <BoardContext.Provider
      value={{
        selectedBoard,
        setSelectedBoard,
        resetSelectedBoard,
        selectColumn,
        selectTask,
        selectedColumn,
        selectedTask,
      }}>
      {children}
    </BoardContext.Provider>
  );
};

export const useSelecedBoard = () => {
  const context = useContext(BoardContext);
  if (!context) throw new Error("debes selecionar una board");
  return context;
};
