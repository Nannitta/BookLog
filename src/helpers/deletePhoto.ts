import path from 'path';
import { promises as fs } from 'fs';
import { throwError } from './errorHandler';

const deletePhoto = async (imgName: string) => {
  const { UPLOADS_DIR } = process.env;

  if (UPLOADS_DIR) {
    const imgPath = path.resolve(__dirname, '../', UPLOADS_DIR, imgName );

    try {
      await fs.access(imgPath);
      await fs.unlink(imgPath);
    } catch (err) {
      console.error(err);
      throw throwError('No se ha podido eliminar la imagen', 500);
    }
  }
};

export default deletePhoto;
