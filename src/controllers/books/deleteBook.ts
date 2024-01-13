import { Request, Response, NextFunction } from 'express';
import db from '../../db/initDbFirebase';
import { throwError } from '../../helpers/errorHandler';
import deletePhoto from '../../helpers/deletePhoto';

const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { idBook } = req.params;

    const checkedBook = await db.collection('books').where('__name__', '==', idBook).get();
    
    if (checkedBook.empty) {
      throw throwError('El libro que quieres eliminar no existe', 400);
    }

    if (checkedBook && idBook) {
      deletePhoto(checkedBook.docs[0]?.data()['cover']);
      await db.collection('books').doc(idBook).delete();
    }

    res.status(200).send({
      status: 'Ok',
      message: 'Libro eliminado correctamente'
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export default deleteBook;