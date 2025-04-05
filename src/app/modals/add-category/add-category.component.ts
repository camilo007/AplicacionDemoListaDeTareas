import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { v4 as uuidv4 } from 'uuid';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
  standalone: false,
})
export class AddCategoryComponent {
  name: string = '';

  constructor(
    private modalCtrl: ModalController,
    private storage: Storage,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) {}

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
      id: Date.now(),
      name: this.name.trim(),
    };

    const categories = (await this.storage.get('categories')) || [];
    categories.push(newCategory);
    await this.storage.set('categories', categories);

    await this.showToast('Categoría guardada exitosamente');
    this.modalCtrl.dismiss({ reload: true });

  }

  close() {
    this.modalCtrl.dismiss();
  }
}
