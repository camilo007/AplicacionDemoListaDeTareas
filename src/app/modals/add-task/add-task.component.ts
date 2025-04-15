import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { v4 as uuidv4 } from 'uuid';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { RemoteConfigService } from '../../infrastructure/services/remote-config.service';
import { AddTaskUseCase } from '../../domain/usecases/add-task.usecase';
import { Task } from '../../domain/models/task.model';
import { LocalTaskRepository } from '../../infrastructure/repositories/local-task.repository';
@Component({
  standalone: false,
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent {
  title: string = '';
  description: string = '';
  categoryId: string = '';
  categories: any[] = [];
  featureEnabled: boolean = true; 

  private addTaskUseCase: AddTaskUseCase;

  constructor(
    private modalCtrl: ModalController,
    private storage: Storage,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private remoteConfigService: RemoteConfigService,    
    private taskRepository: LocalTaskRepository 
  ) {
    this.addTaskUseCase = new AddTaskUseCase(this.taskRepository);
  }

  async ionViewWillEnter() {
    const storedCategories = await this.storage.get('categories');
    this.categories = storedCategories || [];
    this.featureEnabled = await this.remoteConfigService.getFeatureFlag('feature_add_task');


    if (!this.featureEnabled) {
      const alert = await this.alertCtrl.create({
        header: 'Funcionalidad desactivada',
        message: 'La opción para agregar tareas no está disponible en este momento.',
        buttons: [{
          text: 'OK',
          handler: () => {
            this.close();
          }
        }]
      });
      await alert.present();
      console.log(this.featureEnabled)
    }
  }

  async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      color: 'success',
      position: 'bottom'
    });
    await toast.present();
  }

  async showAlert(message: string) {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
  
  async addTask() {
    if (!this.title.trim() || !this.description.trim() || !this.categoryId) {
      const mensaje = !this.title.trim()
      ? 'El título es obligatorio.'
      : !this.description.trim()
      ? 'La descripción es obligatoria.'
      : 'Debes seleccionar una categoría.';

    await this.showAlert(mensaje);
    return;
    }

    const newTask = {
      id: uuidv4(),
      title: this.title,
      description: this.description,
      categoryId: this.categoryId,
      completed: false,
      createdAt: Date.now(),
    };

    await this.addTaskUseCase.execute(newTask);

    await this.showToast('Tarea guardada exitosamente');
    this.modalCtrl.dismiss({ reload: true });
  }

  close() {
    this.modalCtrl.dismiss();
  }
}

