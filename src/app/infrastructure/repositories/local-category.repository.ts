import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Category } from '../../domain/models/category.model';
import { CategoryRepository } from '../../domain/repositories/category.repository';

@Injectable({
  providedIn: 'root',
})
export class LocalCategoryRepository implements CategoryRepository {
  constructor(private storage: Storage) {}

  async getCategories(): Promise<Category[]> {
    return (await this.storage.get('categories')) || [];
  }

  async addCategory(category: Category): Promise<void> {
    const categories = (await this.getCategories()) || [];
    categories.push(category);
    await this.storage.set('categories', categories);
  }

  async deleteCategory(categoryId: string): Promise<void> {
    let categories = await this.getCategories();
    categories = categories.filter((c) => c.id !== categoryId);
    await this.storage.set('categories', categories);
  }

  async updateCategory(updatedCategory: Category): Promise<void> {
    const categories = (await this.storage.get('categories')) || [];
    const updatedCategories = categories.map((cat: Category) =>
      cat.id === updatedCategory.id ? updatedCategory : cat
    );
    await this.storage.set('categories', updatedCategories);
  }
  
}
