import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { v4 as uuidv4 } from 'uuid';
import { AddTaskComponent } from 'src/app/modals/add-task/add-task.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  tasks: any[] = [];
  categories: any[] = [];
  selectedCategoryId: string = '';
  private _storage: Storage | null = null;

  constructor(
    private storage: Storage,
    private modalController: ModalController
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

  getCategoryName(id: string): string {
    const cat = this.categories.find((c) => c.id === id);
    return cat ? cat.name : 'Sin categoría';
  }

  filterTasks() {
    this.loadTasks(); // refrescar la lista
    if (this.selectedCategoryId) {
      this.tasks = this.tasks.filter(
        (task) => task.categoryId === this.selectedCategoryId
      );
    }
  }

  async toggleComplete(task: any) {
    const index = this.tasks.findIndex((t) => t.id === task.id);
    if (index > -1) {
      this.tasks[index].completed = task.completed;
      await this._storage?.set('tasks', this.tasks);
    }
  }

  async deleteTask(id: string) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    await this._storage?.set('tasks', this.tasks);
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
