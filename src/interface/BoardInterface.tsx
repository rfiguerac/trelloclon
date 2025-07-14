
export interface Board {
  Id: string;
  Title: string;
  description: string;
}

export interface Column {
  Id: string;
  Title: string;
  boardId: string;
}

export interface Task {
  Id: string;
  Title: string;
  columnId: string;
}