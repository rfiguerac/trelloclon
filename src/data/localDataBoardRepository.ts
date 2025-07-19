import type { Board } from "../interface/BoardInterface";
import type { BoardRepository } from "../interface/BoardRepository";

let boards: Board[] = [
  {
    Id: "1",
    Title: "Tablero de Ejemplo",
    description: "Este es un tablero de ejemplo para demostrar la funcionalidad.",
  },
  {
    Id: "2",
    Title: "Otro Tablero",
    description: "Este es otro tablero de ejemplo.",
  },
  {
    Id: "3",
    Title: "Otro Tablero número 3",
    description: "Este es otro tablero de ejemplo.",
  },
];

let idCounter = boards.length + 1;

export const localBoardRepository: BoardRepository = {
  getAllBoards: async function (): Promise<Board[]> {
    return boards;
  },

  createBoard: async function (board: Partial<Board>): Promise<Board> {
    const newBoard: Board = {
      Id: String(idCounter++),
      Title: board.Title ?? "Sin título",
      description: board.description ?? "",
    };
    return newBoard;
  },

  updateBoard: async function (board: Partial<Board>): Promise<Board | null> {
    if (!board.Id) return null;

    const index = boards.findIndex((b) => b.Id === board.Id);
    if (index === -1) return null;

    boards[index] = {
      ...boards[index],
      ...board,
    };

    return boards[index];
  },

  deleteBoard: async function (boardId: string): Promise<string> {
    const index = boards.findIndex((b) => b.Id === boardId);
    if (index === -1) throw new Error("Board no encontrada");

    boards.splice(index, 1);
    return boardId;
  },
};
