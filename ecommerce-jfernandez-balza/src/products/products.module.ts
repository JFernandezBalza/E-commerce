import { Module } from '@nestjs/common';
import { ProductsControllers } from './products.controllers';
import { ProductsService } from './products.services';
import { ProductsRepository } from './products.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/entities/categories.entity';
import { Product } from './products.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category])],
  controllers: [ProductsControllers],
  providers: [ProductsService, ProductsRepository],
})
export class ProductsModule {}
