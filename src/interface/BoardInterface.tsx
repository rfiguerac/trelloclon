
export interface Board {
  id: string;
  title: string;
  description: string;
}

export interface Column {
  id: string;
  title: string;
  boardId: string;
}

export interface Task {
  id: string;
  title: string;
  columnId: string;
}