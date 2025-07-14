import { nocoBoardRepository } from "../data/nocoBoardRepository";
import type { Board } from "../interface/BoardInterface";
import type { BoardRepository } from "../interface/BoardRepository";


export const useBoard = (repository: BoardRepository = nocoBoardRepository) => {

  const getAllBoards = async () => {
    const boards = await repository.getAllBoards();
    return boards;
  };

  const createBoard = async (board: Partial<Board>) => {
    const newBoard = await repository.createBoard(board);
    return newBoard;
  };

  const updateBoard = async (board: Board) => {
    const updatedBoard = await repository.updateBoard(board);
    return updatedBoard;
  };

  const deleteBoard = async (id: string) => {
    await repository.deleteBoard(id);
    return id;
  };

  return {
    getAllBoards,
    createBoard,
    updateBoard,
    deleteBoard,
  };
};
