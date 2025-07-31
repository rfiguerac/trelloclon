// import { localBoardRepository } from "../data/localDataBoardRepository";
import { nocoBoardRepository } from "../data/nocoBoardRepository";
import type { Board } from "../interface/BoardInterface";
import type { BoardRepository } from "../interface/BoardRepository";

export const boardService = (
  repository: BoardRepository = nocoBoardRepository
) => {
  const getBoards = async () => {
    const boards = await repository.getAllBoards();
    return boards;
  };

  const createBoard = async (board: Omit<Board, "Id">) => {
    const newBoard = await repository.createBoard(board);
    return newBoard;
  };

  const updateBoard = async (board: Board) => {
    const updatedBoard = await repository.updateBoard(board);
    if (!updatedBoard) {
      throw new Error("Board not found");
    }
    return updatedBoard;
  };

  const deleteBoard = async (id: string) => {
    await repository.deleteBoard(id);
    return id;
  };

  return {
    getBoards,
    createBoard,
    updateBoard,
    deleteBoard,
  };
};
