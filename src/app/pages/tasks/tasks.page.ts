import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { v4 as uuidv4 } from 'uuid';
import { AddTaskComponent } from 'src/app/modals/add-task/add-task.component';
import { ToastController } from '@ionic/angular';

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

  constructor(
    private storage: Storage,
    private modalController: ModalController,
    private toastCtrl: ToastController
  ) {}

  async ngOnInit() {
    this._storage = await this.storage.create();
    await this.loadCategories();
    await this.loadTasks();
  }

  async loadTasks() {
    const storedTasks = await this._storage?.get('tasks');
    this.tasks = storedTasks || [];
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
    const index = this.tasks.findIndex((t: any) => t.id === task.id);
    if (index > -1) {
      this.tasks[index].completed = !this.tasks[index].completed;
      await this._storage?.set('tasks', this.tasks);
      this.filterTasks(); 
    }
  
    const toast = await this.toastCtrl.create({
      message: task.completed ? 'Tarea completada' : 'Tarea marcada como pendiente',
      duration: 1500,
      color: task.completed ? 'success' : 'medium',
    });
    await toast.present();
  }

  async deleteTask(taskId: number) {
    this.tasks = this.tasks.filter((t: any) => t.id !== taskId);
    await this._storage?.set('tasks', this.tasks);
    this.filterTasks(); 
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
