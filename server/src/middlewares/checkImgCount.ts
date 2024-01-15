import multer from 'multer';
import { Request, Response, NextFunction } from 'express';
import { throwError } from '../helpers/errorHandler';

const upload = multer().single('cover');

const checkImageCount = (req: Request, res: Response, next: NextFunction) => {
  upload(req, res, (err) => {
    try {
      if (err instanceof multer.MulterError) {
        throw throwError('No puedes subir más de un archivo', 400);
      } else if (err) {
        throw throwError('Error inesperado', 400);
      }
    } catch (err) {
      console.error(err);
      next(err);
    }
    next();
  });
};

export default checkImageCount;
