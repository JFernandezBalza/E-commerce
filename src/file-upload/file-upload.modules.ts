import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/products/products.entity';
import { FileUploadService } from './file-upload.service';
import { CloudinaryConfig } from 'src/config/cloudinary';
import { FileUploadController } from './file-upload.controllers';
import { FileUploadRepository } from './file-upload.reposiroty';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [FileUploadController],
  providers: [FileUploadService, CloudinaryConfig, FileUploadRepository],
})
export class FileUploadModule {}
