import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Task } from '../../domain/models/task.model';
import { Category } from '../../domain/models/category.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _storage: Storage | null = null;

  private TASKS_KEY = 'tasks';
  private CATEGORIES_KEY = 'categories';

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async getTasks(): Promise<Task[]> {
    return (await this._storage?.get(this.TASKS_KEY)) || [];
  }

  async saveTask(task: Task): Promise<void> {
    const tasks = await this.getTasks();
    tasks.push({ ...task, id: uuidv4(), createdAt: Date.now() });
    await this._storage?.set(this.TASKS_KEY, tasks);
  }

  async updateTask(updatedTask: Task): Promise<void> {
    let tasks = await this.getTasks();
    tasks = tasks.map(t => (t.id === updatedTask.id ? updatedTask : t));
    await this._storage?.set(this.TASKS_KEY, tasks);
  }

  async deleteTask(taskId: string): Promise<void> {
    let tasks = await this.getTasks();
    tasks = tasks.filter(t => t.id !== taskId);
    await this._storage?.set(this.TASKS_KEY, tasks);
  }
  async getCategories(): Promise<Category[]> {
    return (await this._storage?.get(this.CATEGORIES_KEY)) || [];
  }

  async saveCategory(category: Category): Promise<void> {
    const categories = await this.getCategories();
    categories.push({ ...category, id: uuidv4() });
    await this._storage?.set(this.CATEGORIES_KEY, categories);
  }

  async updateCategory(updated: Category): Promise<void> {
    let categories = await this.getCategories();
    categories = categories.map(c => (c.id === updated.id ? updated : c));
    await this._storage?.set(this.CATEGORIES_KEY, categories);
  }

  async deleteCategory(categoryId: string): Promise<void> {
    let categories = await this.getCategories();
    categories = categories.filter(c => c.id !== categoryId);
    await this._storage?.set(this.CATEGORIES_KEY, categories);

    let tasks = await this.getTasks();
    tasks = tasks.filter(t => t.categoryId !== categoryId);
    await this._storage?.set(this.TASKS_KEY, tasks);
  }
}
