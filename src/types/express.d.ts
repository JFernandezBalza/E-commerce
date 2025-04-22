import { Multer as MulterType } from 'multer';

declare global {
  namespace Express {
    export interface Multer extends MulterType {}
  }
}
