import type { Column } from "../interface/BoardInterface";

export const useColumn = () => {
  const urlApi = "https://app.nocodb.com/api/v2/tables/mfdcltn6coaaxlo/records";
  const token = "ze-hQCYQLixSb3jXFSoKUnspjD2DQIn-wDOb3DWk";

  const getAllColumn = async () => {
    const opciones = {
      method: "GET",
      headers: {
        accept: "application/json",
        "xc-token": token,
      },
    };
    const response = await fetch(urlApi, opciones);
    if (!response.ok) {
      throw new Error("Error al obtener las columnas");
    }
    const data = await response.json();
    const board: Column[] = data.list.map((Column: any) => ({
      id: Column.Id,
      title: Column.Title,
      boardId: Column.boardId,
    }));
    return board;
  };


  const createColumn = async (column: any) => {
    const opciones = {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "xc-token": token,
      },
      body: JSON.stringify(column),
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

  
  const updateColumn = async (column: any) => {
    const opciones = {
      method: "PATCH",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "xc-token": token,
      },
      body: JSON.stringify(column),
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


  const deleteColumn = async (id: string) => {
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
        throw new Error("Error al eliminar la columna");
      })
      .catch((err) => console.log(err));
    
  };

  return {
    getAllColumn,
    createColumn,
    updateColumn,
    deleteColumn,
  };
};
