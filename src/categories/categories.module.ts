import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/entities/categories.entity';
import { CategoriesController } from 'src/categories/categories.controller';
import { CategoriesService } from 'src/categories/categories.service';
import { CategoriesRepository } from 'src/categories/categories.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoriesController],
  providers: [CategoriesService, CategoriesRepository],
})
export class CategoriesModule {}
