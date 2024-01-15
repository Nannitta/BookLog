import { Request, Response, NextFunction } from 'express';
import db from '../../db/initDbFirebase';
import { throwError } from '../../helpers/errorHandler';
import { Book } from '../../types/book.type';

const getBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let checkBook;
    let searchBook: Book | null = null;
    const { idBook } = req.params;
    
    if(idBook) {
      checkBook = await db.collection('books').where('__name__', '==' , idBook).get();
    }
    
    if(checkBook) {
      if(checkBook.empty) {
        throw throwError('El libro que estas buscando no existe', 400);
      }
      if (checkBook.docs[0]){
        searchBook = checkBook.docs[0].data();   
        res.status(200).send(searchBook);
      }   
    }
    
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export default getBook;
