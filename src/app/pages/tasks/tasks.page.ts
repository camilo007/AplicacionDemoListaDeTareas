import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { v4 as uuidv4 } from 'uuid';
import { AddTaskComponent } from 'src/app/modals/add-task/add-task.component';
import { ToastController } from '@ionic/angular';
import { GetTasksUseCase } from '../../domain/usecases/get-tasks.usecase';
import { LocalTaskRepository } from '../../infrastructure/repositories/local-task.repository';
import { Task } from '../../domain/models/task.model';
import { ToggleCompleteTaskUseCase } from '../../domain/usecases/toggle-complete-task.usecase';
import { DeleteTaskUseCase } from '../../domain/usecases/delete-task.usecase';

@Component({
  selector: 'app-home',
  templateUrl: 'tasks.page.html',
  styleUrls: ['tasks.page.scss'],
  standalone: false,
})
export class TasksPage implements OnInit {
  tasks: any[] = []; 
  filteredTasks: any[] = [];
  categories: any[] = [];
  selectedCategoryId: number | null = null;
  private _storage: Storage | null = null;
  private getTasksUseCase: GetTasksUseCase;
  private toggleCompleteUseCase: ToggleCompleteTaskUseCase;
  private deleteTaskUseCase: DeleteTaskUseCase;

  constructor(
    private storage: Storage,
    private modalController: ModalController,
    private toastCtrl: ToastController,
    private taskRepository: LocalTaskRepository
  ) {
    this.getTasksUseCase = new GetTasksUseCase(this.taskRepository);
    this.toggleCompleteUseCase = new ToggleCompleteTaskUseCase(this.taskRepository);
    this.deleteTaskUseCase = new DeleteTaskUseCase(this.taskRepository);
  }

  async ngOnInit() {
    this._storage = await this.storage.create();
    await this.loadCategories();
    await this.loadTasks();
  }

  async loadTasks() {
    this.tasks = await this.getTasksUseCase.execute();
    this.filterTasks();
  }

  async loadCategories() {
    const storedCategories = await this._storage?.get('categories');
    this.categories = storedCategories || [];
  }

  applyFilter() {
    if (this.selectedCategoryId) {
      this.filteredTasks = this.tasks.filter(task => task.categoryId === this.selectedCategoryId);
    } else {
      this.filteredTasks = [...this.tasks];
    }
  }

  onCategoryChange(categoryId: number | null) {
    this.selectedCategoryId = categoryId;
    this.applyFilter();
  }

  getCategoryName(id: string): string {
    const cat = this.categories.find((c) => c.id === id);
    return cat ? cat.name : 'Sin categoría';
  }

  filterTasks() {
    if (this.selectedCategoryId) {
      this.filteredTasks = this.tasks.filter(
        (task) => task.categoryId === this.selectedCategoryId
      );
    } else {
      this.filteredTasks = [...this.tasks]; 
    }
  }

  async toggleComplete(task: any) {
    await this.toggleCompleteUseCase.execute(task.id);
    await this.loadTasks();
    const toast = await this.toastCtrl.create({
      message: task.completed ? 'Tarea completada' : 'Tarea marcada como pendiente',
      duration: 1500,
      color: task.completed ? 'success' : 'medium',
    });
    await toast.present();
  }

  async deleteTask(taskId: string) {
    await this.deleteTaskUseCase.execute(taskId);
    await this.loadTasks();
  }
  

  async openAddTaskModal() {
    const modal = await this.modalController.create({
      component: AddTaskComponent,
    });
  
    modal.onDidDismiss().then((result) => {
      if (result.data?.reload) {
        this.loadTasks();
      }
    });
  
    await modal.present();
  }
}
