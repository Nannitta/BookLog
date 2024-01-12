import 'dotenv/config';
import randomstring from 'randomstring';
import sharp from 'sharp';
import path from 'path';
import { promises as fs } from 'fs';
import { throwError } from './errorHandler';


const savePhoto = async (photo, width) => {
  const { UPLOADS_DIR } = process.env;
  let uploadsPath: string;

  if (UPLOADS_DIR) {
    uploadsPath = path.resolve(__dirname, '../', UPLOADS_DIR);

    try {
      await fs.access(uploadsPath);
    } catch {
      await fs.mkdir(uploadsPath);
    }

    try {
      const img: sharp.Sharp = sharp(photo.data);
      img.resize(width);
      
      const imgName: string = randomstring.generate(15) + path.extname(photo.name);
      
      const imgPath: string = path.join(uploadsPath, imgName);

      await img.toFile(imgPath);

      return imgName;
    } catch (err) {
      throw throwError('Error procesando la imagen', 500);
    }
  } else {
    throw throwError('No se ha definido la ruta del archivo', 500);
  }
};

export default savePhoto;