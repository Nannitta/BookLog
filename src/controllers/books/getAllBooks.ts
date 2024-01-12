import { NextFunction, Response } from 'express';
import { Book } from '../../types/book.type';
import db from '../../db/initDbFirebase';
import { throwError } from '../../helpers/errorHandler';

const getAllBooks = async (_, res: Response, next: NextFunction) => {
  try {
    const data = await db.collection('books').get();
 
    const allBooks: Book[] = data.docs.map((doc) => ({
      id: doc.id,
      title: doc.data()['title'],
      author: doc.data()['author'],
      yearRelease: doc.data()['yearRelease'],
      editorial: doc.data()['editorial'],
      resume: doc.data()['resume'],
      cover: doc.data()['cover'],
      createdAt: doc.data()['createdAt'],
      modifiedAt: doc.data()['modifiedAt']
    }));

    if (allBooks.length < 1) {
      throw throwError('No se ha encontrado ningún libro', 404);
    }
    
    res.status(200).send(allBooks);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export default getAllBooks;