import { NextFunction, Request, Response } from 'express';
import db from '../../db/initDbFirebase';
import { throwError } from '../../helpers/errorHandler';
import savePhoto from '../../helpers/savePhoto';

const addBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, author, yearRelease, editorial, resume } = req.body;
    const coverFile = req.file;
       
    const checkBook = await db.collection('books').where('title', '==', title).get();

    if(checkBook.docs[0]?.data()) {
      throw throwError('Ya existe un libro con ese título', 400);
    }

    if (!coverFile) {
      throw throwError('Debes subir una foto de la portada', 400);
    } 
    
    const cover = await savePhoto(coverFile);
    
    const createdAt: Date = new Date();

    if (!title || !author || !yearRelease || !editorial || !resume) {
      throw throwError('Debes rellenar todos los campos', 400);
    }

    const newBook = await db.collection('books').add({
      title, author, yearRelease, editorial, resume, createdAt, cover
    });

    res.status(200).send({
      status: 'Ok',
      message: 'Libro añadido correctamente',
      data: newBook
    });
  } catch(err) {
    console.error(err);
    next(err);
  }
};

export default addBook;