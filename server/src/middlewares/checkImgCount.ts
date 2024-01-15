import multer from 'multer';
import { Request, Response, NextFunction } from 'express';
import { throwError } from '../helpers/errorHandler';

const checkImageCount = (req: Request, res: Response, next: NextFunction) => {
  const upload = multer().single('cover');
  upload(req, res, function(err) {
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