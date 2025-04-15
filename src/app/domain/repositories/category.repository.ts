import { Category } from '../models/category.model';

export abstract class CategoryRepository {
  abstract getCategories(): Promise<Category[]>;
  abstract addCategory(category: Category): Promise<void>;
  abstract deleteCategory(categoryId: string): Promise<void>;
  abstract updateCategory(category: Category): Promise<void>;
}
