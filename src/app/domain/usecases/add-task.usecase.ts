import { Task } from '../models/task.model';
import { TaskRepository } from '../repositories/task.repository';

export class AddTaskUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute(task: Task): Promise<void> {
    await this.taskRepository.addTask(task);
  }
}
