import type { Board } from "./BoardInterface";

export interface BoardRepository {
  getAllBoards(): Promise<Board[]>;
  createBoard(board: Omit<Board, "Id">): Promise<Board>;
  updateBoard(board: Board): Promise<Board | null>;
  deleteBoard(boardId: string): Promise<string>;
}
