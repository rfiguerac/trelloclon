import type { Board } from "../interface/BoardInterface";
import type { BoardRepository } from "../interface/BoardRepository";

const urlApi = "https://app.nocodb.com/api/v2/tables/mf10sjpw32r5ar2/records";
  const token = "ze-hQCYQLixSb3jXFSoKUnspjD2DQIn-wDOb3DWk";
  
export const nocoBoardRepository: BoardRepository = {
    
    getAllBoards: async function (): Promise<Board[]> {

        const opciones = {
      method: "GET",
      headers: {
        accept: "application/json",
        "xc-token": token,
      },
    };
    const response = await fetch(urlApi, opciones);
    if (!response.ok) {
      throw new Error("Error al obtener los tableros");
    }
    const data = await response.json();
    const board: Board[] = data.list;
    return board;


    },
    createBoard: async function (board:Partial<Board>): Promise<Board> {
        const opciones = {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "xc-token": token,
      },
      body: JSON.stringify(board),
    };

    try {
      const resp = await fetch(urlApi, opciones);
      const datos = await resp.json();
      const newBoard = {...board, Id: datos.Id};
      return newBoard as Board;

    } catch (error) {
      console.log(error);
        return board as Board;
    }
    },
    updateBoard: async function (board: Partial<Board>): Promise<Board | null> {
        const opciones = {
      method: "PATCH",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "xc-token": token,
      },
      body: JSON.stringify(board),
    };

    try {
      const resp = await fetch(urlApi, opciones);
      const datos = await resp.json();
      return datos.Id;

    } catch (error) {
      console.log(error);
      return null;
    }
    },
    deleteBoard: async function (boardId: string): Promise<string> {
        const opciones = {
      method: "DELETE",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "xc-token": token,
      },
      body: JSON.stringify({ Id: boardId }),
    };

    try {
        const resp = await fetch(urlApi, opciones);
        const datos = await resp.json();
        return datos.Id;
    } catch (error) {
        console.log(error);
        throw new Error("Error al eliminar la board");
    }
        
    }
}