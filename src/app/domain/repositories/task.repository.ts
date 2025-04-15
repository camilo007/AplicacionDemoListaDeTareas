import { Task } from '../models/task.model';

export abstract class TaskRepository {
  abstract addTask(task: Task): Promise<void>;
  abstract getTasks(): Promise<Task[]>;
  abstract toggleTaskCompletion(taskId: string): Promise<void>;
  abstract deleteTask(taskId: string): Promise<void>;
}

