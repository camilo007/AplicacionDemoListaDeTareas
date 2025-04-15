import { Task } from '../models/task.model';
import { TaskRepository } from '../repositories/task.repository';

export class GetTasksUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute(): Promise<Task[]> {
    return await this.taskRepository.getTasks();
  }
}
