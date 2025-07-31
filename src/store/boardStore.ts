import { create } from "zustand";
import type { Board } from "../interface/BoardInterface";
import { boardService } from "../services/boardService.ts";

const { getBoards, createBoard, updateBoard, deleteBoard } = boardService();

interface BoardState {
  boards: Board[];
  selectedBoard?: Board;
  fetchBoards: () => Promise<void>;
  setSelectedBoard: (board: Board) => void;
  addBoard: (board: Omit<Board, "Id">) => Promise<void>;
  editBoard: (board: Board) => Promise<void>;
  removeBoard: (id: string) => Promise<void>;
}

export const useBoardStore = create<BoardState>((set) => ({
  boards: [],
  selectedBoard: undefined,
  fetchBoards: async () => {
    const data = await getBoards();
    set({ boards: data });
  },
  setSelectedBoard: (board) => set({ selectedBoard: board }),
  addBoard: async (newBoard) => {
    const created = await createBoard(newBoard);
    set((state) => ({ boards: [...state.boards, created] }));
  },
  editBoard: async (board) => {
    const updated = await updateBoard(board);
    set((state) => ({
      boards: state.boards.map((b) => (b.Id === board.Id ? updated : b)),
    }));
  },
  removeBoard: async (id) => {
    await deleteBoard(id);
    set((state) => ({
      boards: state.boards.filter((b) => b.Id !== id),
      selectedBoard:
        state.selectedBoard?.Id === id ? undefined : state.selectedBoard,
    }));
  },
}));
