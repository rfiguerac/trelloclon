import type { Board } from "./BoardInterface";


export interface BoardRepository {
    getAllBoards(): Promise<Board[]>;
    createBoard(board: Partial<Board>): Promise<Board>;
    updateBoard(board: Partial<Board>): Promise<Board | null>;
    deleteBoard(boardId: string): Promise<string>;
}
