import { Category } from '../models/category.model';
import { CategoryRepository } from '../repositories/category.repository';

export class GetCategoriesUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(): Promise<Category[]> {
    return this.categoryRepository.getCategories();
  }
}
