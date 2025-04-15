import { Task } from '../models/task.model';
import { TaskRepository } from '../repositories/task.repository';

export class ToggleCompleteTaskUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute(taskId: string): Promise<void> {
    await this.taskRepository.toggleTaskCompletion(taskId);
  }
}
