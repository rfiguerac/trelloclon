import type { Column } from "../interface/BoardInterface";
import type { ColumnRepository } from "../interface/ColumnRepository";

// Simulación local en memoria
let columns: Column[] = [
  { Id: "1", Title: "Columna de Ejemplo", boardId: "1" },
  { Id: "2", Title: "Otra Columna", boardId: "1" },
  { Id: "3", Title: "Columna de Tareas", boardId: "1" },
  { Id: "4", Title: "Columna de Proyectos", boardId: "1" },
];

let columnIdCounter = columns.length + 1;

export const localColumnRepository: ColumnRepository = {
  getAllColumn: async function (): Promise<Column[]> {
    return columns;
  },

  createColumn: async function (column: Partial<Column>): Promise<Column> {
    const newColumn: Column = {
      Id: String(columnIdCounter++),
      Title: column.Title ?? "Sin título",
      boardId: column.boardId ?? "1",
    };
    return newColumn;
  },

  updateColumn: async function (column: Partial<Column>): Promise<Column | null> {
    if (!column.Id) return null;

    const index = columns.findIndex((c) => c.Id === column.Id);
    if (index === -1) return null;

    columns[index] = {
      ...columns[index],
      ...column,
    };

    return columns[index];
  },

  deleteColumn: async function (columnId: string): Promise<string> {
    const index = columns.findIndex((c) => c.Id === columnId);
    if (index === -1) throw new Error("Columna no encontrada");

    columns.splice(index, 1);
    return columnId;
  },
};
