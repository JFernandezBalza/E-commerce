import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/categories.entity';
import { preload } from 'src/helpers/preload';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async getCategories(): Promise<Category[]> {
    return await this.categoriesRepository.find();
  }

  async addCategories(): Promise<string> {
    await Promise.all(
      preload?.map(async (element) => {
        await this.categoriesRepository
          .createQueryBuilder()
          .insert()
          .into(Category)
          .values({ name: element.category })
          .orIgnore()
          .execute();
      }),
    );
    return `Categories seeder`;
  }
}
