import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { Product } from './products.entity';
import { UpdateProductDto } from 'src/dtos/product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}
  async getProductsService(
    page: number = 1,
    limit: number = 10,
  ): Promise<{ data: Product[]; total: number }> {
    return await this.productsRepository.getProducts(page, limit);
  }
  async getProductByIdService(id: string): Promise<Product> {
    return await this.productsRepository.getProductById(id);
  }
  async createProductService(product: UpdateProductDto): Promise<string> {
    return await this.productsRepository.createProduct(product);
  }
  async updateProductService(
    id: string,
    productData: UpdateProductDto,
  ): Promise<string> {
    return await this.productsRepository.updateProduct(id, productData);
  }

  async deleteProductService(id: string): Promise<string> {
    return await this.productsRepository.deleteProduct(id);
  }
  seedProducts() {
    return this.productsRepository.seedProduct();
  }
}
