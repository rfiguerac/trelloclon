import type { Board } from "../interface/BoardInterface";

export const useBoard = () => {
  const urlApi = "https://app.nocodb.com/api/v2/tables/mf10sjpw32r5ar2/records";
  const token = "ze-hQCYQLixSb3jXFSoKUnspjD2DQIn-wDOb3DWk";

  const getAllBoards = async () => {
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
    const board: Board[] = data.list.map((board: any) => ({
      id: board.Id,
      title: board.Title,
      description: board.description,
    }));
    return board;
  };


  const createBoard = async (board: any) => {
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
      return datos;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  const updateBoard = async (board: any) => {
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
      return datos;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const deleteBoard = async (id: string) => {
     const opciones = {
      method: "DELETE",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "xc-token": token,
      },
      body: JSON.stringify({ Id: id }),
    };

    fetch(urlApi, opciones)
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
        throw new Error("Error al eliminar el alumno");
      })
      .catch((err) => console.log(err));
  };

  return {
    getAllBoards,
    createBoard,
    updateBoard,
    deleteBoard,
  };
};
