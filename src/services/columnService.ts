// import { localColumnRepository } from "../data/localDataColumnRepository";
import { nocoColumnRepository } from "../data/nocoColumnRepository";
import type { Column } from "../interface/BoardInterface";
import type { ColumnRepository } from "../interface/ColumnRepository";

export const columnService = (
  repository: ColumnRepository = nocoColumnRepository
) => {
  const getColumns = async () => {
    const columns = await repository.getAllColumn();
    return columns;
  };

  const createColumn = async (column: Omit<Column, "Id">) => {
    const newColumn = await repository.createColumn(column);
    return newColumn;
  };

  const updateColumn = async (column: Column) => {
    const updatedColumn = await repository.updateColumn(column);
    if (!updatedColumn) {
      throw new Error("Column not found");
    }
    return updatedColumn;
  };

  const deleteColumn = async (id: string) => {
    await repository.deleteColumn(id);
    return id;
  };

  return {
    getColumns,
    createColumn,
    updateColumn,
    deleteColumn,
  };
};
