import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { v4 as uuidv4 } from 'uuid';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Category } from '../../domain/models/category.model';
import { AddCategoryUseCase } from '../../domain/usecases/add-category.usecase';
import { LocalCategoryRepository } from '../../infrastructure/repositories/local-category.repository';


@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
  standalone: false,
})
export class AddCategoryComponent {
  name: string = '';
  private addCategoryUseCase: AddCategoryUseCase;

  constructor(
    private modalCtrl: ModalController,
    private storage: Storage,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private categoryRepository: LocalCategoryRepository
  ) {
    this.addCategoryUseCase = new AddCategoryUseCase(this.categoryRepository);
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
      header: 'Campo requerido',
      message: 'El nombre de la categoría es obligatorio.',
      buttons: ['OK']
    });
    await alert.present();
  }

  async addCategory() {
    if (!this.name.trim()) {
      this.showAlert('El nombre de la categoría es obligatorio');
      return;
    }

    const newCategory = {
      id: uuidv4(),
      name: this.name.trim(),
    };

    await this.addCategoryUseCase.execute(newCategory);
    await this.showToast('Categoría guardada exitosamente');
    this.modalCtrl.dismiss({ reload: true });

  }

  close() {
    this.modalCtrl.dismiss();
  }
}
