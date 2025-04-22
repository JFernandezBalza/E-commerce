import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/products.entity';
import { Repository } from 'typeorm';
import { FileUploadRepository } from './file-upload.reposiroty';

@Injectable()
export class FileUploadService {
  constructor(
    private readonly fileUploadRepository: FileUploadRepository,
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  async uploadProductImage(file: Express.Multer.File, productId: string) {
    const product = await this.productsRepository.findOneBy({ id: productId });

    if (!product) {
      throw new NotFoundException('Producto no encontrado');
    }
    const uploadedImage = await this.fileUploadRepository.uploadImage(file);

    await this.productsRepository.update(product.id, {
      imgUrl: uploadedImage.secure_url,
    });
    const updatedProduct = await this.productsRepository.findOneBy({
      id: productId,
    });
    return updatedProduct;
  }
}
