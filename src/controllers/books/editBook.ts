import { Request, Response, NextFunction } from 'express';
import db from '../../db/initDbFirebase';
import { throwError } from '../../helpers/errorHandler';

const editBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { idBook } = req.params;
    const { title, author, yearRelease, editorial, resume } = req.body;
    let cover;

    // Ver por que req.file o req.files o cover llega undefined
    const checkedBook = await db.collection('books').where('__name__', '==', idBook).get();
    
    if (checkedBook.empty) {
      throw throwError('El libro que quieres editar no existe', 400);
    }    
    
    if (!title && !author && !yearRelease && !editorial && !resume && !cover) {
      throw throwError('Debes modificar algún campo', 400);
    }

    res.status(200).send({
      status: 'Ok',
      message: 'Libro editado correctamente'
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export default editBook;