import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import * as toStream from 'buffer-to-stream';

@Injectable()
export class FileLoadRepository {
  async uploadImg(file: Express.Multer.File) {
    const upload = cloudinary.uploader.upload_stream(
      { resource_type: `auto` },
      (error, result) => {
        if (error) {
          console.log(error);
        } else {
          console.log(result);
        }
      },
    );

    toStream(file.buffer).pipe(upload);
  }
}
