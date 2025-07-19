
import { localColumnRepository } from "../data/localDataColumnRepository";
import { nocoColumnRepository } from "../data/nocoColumnRepository";
import type { Column } from "../interface/BoardInterface";
import type { ColumnRepository } from "../interface/ColumnRepository";

;

export const useColumn = (repository: ColumnRepository = localColumnRepository) => {
 
  const getAllColumn = async () => {
    const columns = await repository.getAllColumn();
    return columns;
  
  };


  const createColumn = async (column: Partial<Column>) => {
    const newColumn = await repository.createColumn(column);
    return newColumn;
  };

  
  const updateColumn = async (column: Partial<Column>) => {
    const updatedColumn = await repository.updateColumn(column);
    return updatedColumn;
  };


  const deleteColumn = async (id: string) => {
    await repository.deleteColumn(id);
    return id;
  };

  return {
    getAllColumn,
    createColumn,
    updateColumn,
    deleteColumn,
  };
};
