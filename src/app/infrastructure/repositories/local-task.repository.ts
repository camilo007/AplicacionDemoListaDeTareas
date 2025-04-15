import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Task } from '../../domain/models/task.model';
import { TaskRepository } from '../../domain/repositories/task.repository';

@Injectable({
  providedIn: 'root',
})
export class LocalTaskRepository implements TaskRepository {
  constructor(private storage: Storage) {}

  async addTask(task: Task): Promise<void> {
    const tasks = (await this.storage.get('tasks')) || [];
    tasks.push(task);
    await this.storage.set('tasks', tasks);
  }

  async getTasks(): Promise<Task[]> {
    return (await this.storage.get('tasks')) || [];
  }

  async toggleTaskCompletion(taskId: string): Promise<void> {
    const tasks = (await this.storage.get('tasks')) || [];
    const updatedTasks = tasks.map((task: Task) => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    await this.storage.set('tasks', updatedTasks);
  }

  async deleteTask(taskId: string): Promise<void> {
    const tasks = (await this.storage.get('tasks')) || [];
    const updatedTasks = tasks.filter((t: any) => t.id !== taskId);
    await this.storage.set('tasks', updatedTasks);
  }
  
}
