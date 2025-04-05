export interface Task {
    id: string;
    title: string;
    completed: boolean;
    categoryId: string; // ID de la categoría a la que pertenece
    createdAt: number;
  }
  