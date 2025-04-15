import { CategoryRepository } from '../repositories/category.repository';

export class DeleteCategoryUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(categoryId: string): Promise<void> {
    await this.categoryRepository.deleteCategory(categoryId);
  }
}
