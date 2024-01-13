import { Request, Response, NextFunction } from 'express';
import db from '../../db/initDbFirebase';
import { throwError } from '../../helpers/errorHandler';
import deletePhoto from '../../helpers/deletePhoto';
import savePhoto from '../../helpers/savePhoto';

const editBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { idBook } = req.params;
    const { title, author, yearRelease, editorial, resume } = req.body;
    const cover: Express.Multer.File | undefined = req.file;
    let newCover: string = '';
    
    const checkedBook = await db.collection('books').where('__name__', '==', idBook).get();
    
    if (checkedBook.empty) {
      throw throwError('El libro que quieres editar no existe', 400);
    }    
    
    if (!title && !author && !yearRelease && !editorial && !resume && !cover) {      
      throw throwError('Debes modificar algún campo', 400);
    }
    
    if (cover) {
      if(checkedBook.docs[0]?.data()['cover']) {
        await deletePhoto(checkedBook.docs[0]?.data()['cover']);
      }
      newCover = await savePhoto(cover);
      console.log(newCover);
    }

    const editedBook = {
      title: title || checkedBook.docs[0]?.data()['title'],
      author: author || checkedBook.docs[0]?.data()['author'],
      editorial: editorial || checkedBook.docs[0]?.data()['editorial'],
      resume: resume || checkedBook.docs[0]?.data()['resume'],
      cover: newCover || checkedBook.docs[0]?.data()['cover'],
      yearRelease: yearRelease || checkedBook.docs[0]?.data()['yearRelease'],
    };

    if(idBook) {
      await db.collection('books').doc(idBook).set(editedBook);
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