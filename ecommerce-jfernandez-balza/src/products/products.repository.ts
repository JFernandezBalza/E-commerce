import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './products.entity';
import { preload } from 'src/helpers/preload';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/categories.entity';
import { Repository } from 'typeorm';
import { UpdateProductDto } from 'src/dtos/product.dto';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async getProducts(
    page: number = 1,
    limit: number = 10,
  ): Promise<{ data: Product[]; total: number }> {
    const [products, total] = await this.productRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });

    return { data: products, total };
  }
  async getProductById(id: string): Promise<Product> {
    const producFound = await this.productRepository.findOne({
      where: { id },
    });
    if (!producFound) {
      throw new NotFoundException(`No se encontro el producto con ID ${id}`);
    }
    return producFound;
  }
  async createProduct(productData: Partial<Product>): Promise<string> {
    const newProduct = await this.productRepository.save(productData);
    return newProduct.id;
  }
  async updateProduct(id: string, product: UpdateProductDto): Promise<string> {
    const category = await this.categoryRepository.findOneBy({
      id: product.categoryId,
    });
    if (!category) {
      throw new NotFoundException(
        `Categoria con ID ${product.categoryId} no encontrada `,
      );
    }
    const result = await this.productRepository
      .createQueryBuilder()
      .update(Product)
      .set({
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        imgUrl: product.imgUrl,
        category: category,
      })
      .where('id= :id', { id })
      .execute();

    if (result.affected === 0) {
      throw new NotFoundException(`Product con ID ${id} no encontrado`);
    }
    const updateProduct = await this.productRepository.findOneBy({ id });
    if (!updateProduct) {
      throw new NotFoundException(
        `Producto con ID ${id} no encontrado despues de actualizar`,
      );
    }
    return updateProduct.id;
  }

  async deleteProduct(id: string): Promise<string> {
    const product = await this.productRepository.findOneBy({ id });

    if (!product) {
      throw new NotFoundException(`No se encontro el producto con ID ${id}`);
    }
    this.productRepository.remove(product);
    return product.id;
  }

  async seedProduct() {
    const categories = await this.categoryRepository.find();

    await Promise.all(
      preload?.map(async (element) => {
        const productCategory = categories.find(
          (category) => category.name === element.category,
        );

        const product = new Product();
        product.name = element.name;
        product.description = element.description;
        product.price = element.price;
        product.stock = element.stock;
        product.category = productCategory;

        await this.productRepository
          .createQueryBuilder()
          .insert()
          .into(Product)
          .values(product)
          .orUpdate(['description', 'price', 'stock'], ['name'])
          .execute();
      }),
    );
    return `Productos added`;
  }
}
