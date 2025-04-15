import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddCategoryComponent } from '../../modals/add-category/add-category.component';
import { Storage } from '@ionic/storage-angular';
import { EditCategoryComponent } from 'src/app/modals/edit-category/edit-category.component';
import { GetCategoriesUseCase } from 'src/app/domain/usecases/get-categories.usecase';
import { DeleteCategoryUseCase } from 'src/app/domain/usecases/delete-category.usecase';
import { LocalCategoryRepository } from 'src/app/infrastructure/repositories/local-category.repository';
import { Category } from 'src/app/domain/models/category.model';

@Component({
  standalone: false,
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {
  categories: any[] = [];

  private getCategoriesUseCase: GetCategoriesUseCase;
  private deleteCategoryUseCase: DeleteCategoryUseCase;

  constructor(
    private modalCtrl: ModalController,
    private storage: Storage,
    private categoryRepository: LocalCategoryRepository
  ) {
    this.getCategoriesUseCase = new GetCategoriesUseCase(this.categoryRepository);
    this.deleteCategoryUseCase = new DeleteCategoryUseCase(this.categoryRepository);
  }

  async ngOnInit() {
    await this.loadCategories();
  }

  async ionViewWillEnter() {
    await this.loadCategories();
  }

  async loadCategories() {
    const stored = await this.storage.get('categories');
    this.categories = stored || [];
  }

  async deleteCategory(categoryId: string) {
    await this.deleteCategoryUseCase.execute(categoryId);
    this.categories = await this.getCategoriesUseCase.execute();
  }
  

  async openAddCategoryModal() {
    const modal = await this.modalCtrl.create({
      component: AddCategoryComponent,
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
    if (data?.reload) {
      this.loadCategories(); 
    }
  }

  async editCategory(cat: any) {
    const modal = await this.modalCtrl.create({
      component: EditCategoryComponent,
      componentProps: { category: cat },
    });
  
    modal.onDidDismiss().then(async (result) => {
      if (result.data?.updatedCategory) {
        const stored = await this.storage.get('categories') || [];
        const updated = stored.map((c: any) => 
          c.id === result.data.updatedCategory.id ? result.data.updatedCategory : c
        );
        await this.storage.set('categories', updated);
        this.categories = updated;
      }
    });
  
    await modal.present();
  }
}
