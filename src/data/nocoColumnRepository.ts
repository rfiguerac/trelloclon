
import type { Column } from "../interface/BoardInterface";
import type { ColumnRepository } from "../interface/ColumnRepository";

const urlApi = "https://app.nocodb.com/api/v2/tables/mfdcltn6coaaxlo/records";
  const token = "ze-hQCYQLixSb3jXFSoKUnspjD2DQIn-wDOb3DWk";
  
export const nocoColumnRepository: ColumnRepository = {
    
    getAllColumn: async function (): Promise<Column[]> {

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
    const column: Column[] = data.list;
    return column;


    },
    createColumn: async function (column:Partial<Column>): Promise<Column> {
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
      const newColumn = {...column, Id: datos.Id};
      return newColumn as Column;

    } catch (error) {
      console.log(error);
        return column as Column;
    }
    },
    updateColumn: async function (column: Partial<Column>): Promise<Column | null> {
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
      return datos.Id;

    } catch (error) {
      console.log(error);
      return null;
    }
    },
    deleteColumn: async function (boardId: string): Promise<string> {
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