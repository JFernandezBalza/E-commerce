import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from 'src/categories/categories.repository';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  addCategories() {
    return this.categoriesRepository.addCategories();
  }

  getCategories() {
    return this.categoriesRepository.getCategories();
  }
}
