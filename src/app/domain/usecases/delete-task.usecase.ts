import { TaskRepository } from '../repositories/task.repository';

export class DeleteTaskUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute(taskId: string): Promise<void> {
    await this.taskRepository.deleteTask(taskId);
  }
}
