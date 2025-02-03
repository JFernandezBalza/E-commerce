import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { Product } from './products.entity';

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
  async createProductrService(product: Partial<Product>): Promise<string> {
    return await this.productsRepository.createProduct(product);
  }
  async updateProductService(
    id: string,
    productData: Product,
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
