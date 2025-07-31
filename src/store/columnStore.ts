import { create } from "zustand";
import type { Column } from "../interface/BoardInterface";
import { columnService } from "../services/columnService";

const { getColumns, createColumn, updateColumn, deleteColumn } =
  columnService();

interface ColumnState {
  columns: Column[];
  fetchColumns: () => Promise<void>;
  addColumn: (column: Omit<Column, "Id">) => Promise<void>;
  editColumn: (column: Column) => Promise<void>;
  removeColumn: (id: string) => Promise<void>;
}

export const useColumnStore = create<ColumnState>((set) => ({
  columns: [],
  fetchColumns: async () => {
    const data = await getColumns();
    set({ columns: data });
  },
  addColumn: async (newColumn) => {
    const created = await createColumn(newColumn);
    set((state) => ({ columns: [...state.columns, created] }));
  },
  editColumn: async (column) => {
    const updated = await updateColumn(column);
    if (updated === null) {
      throw new Error("La columna no se pudo actualizar.");
    }
    set((state) => ({
      columns: state.columns.map((c) => (c.Id === column.Id ? updated : c)),
    }));
  },
  removeColumn: async (id) => {
    await deleteColumn(id);
    set((state) => ({
      columns: state.columns.filter((c) => c.Id !== id),
    }));
  },
}));
