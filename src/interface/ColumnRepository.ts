import type { Column } from "../interface/BoardInterface";



export interface ColumnRepository {
    getAllColumn(): Promise<Column[]>;
    createColumn(column: Column): Promise<Column>;
    updateColumn(columnId: string, column: Partial<Column>): Promise<Column | null>;
    deleteColumn(columnId: string): Promise<void>;
}
