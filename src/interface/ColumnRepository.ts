import type { Column } from "../interface/BoardInterface";

export interface ColumnRepository {
  getAllColumn(): Promise<Column[]>;
  createColumn(column: Omit<Column, "Id">): Promise<Column>;
  updateColumn(column: Column): Promise<Column | null>;
  deleteColumn(columnId: string): Promise<string>;
}
