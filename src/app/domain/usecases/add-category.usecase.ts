import { Category } from '../models/category.model';
import { CategoryRepository } from '../repositories/category.repository';

export class AddCategoryUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(category: Category): Promise<void> {
    await this.categoryRepository.addCategory(category);
  }
}
