import express, { Router } from 'express';
import getAllBooks from '../controllers/books/getAllBooks';
import getBook from '../controllers/books/getBook';
import addBook from '../controllers/books/addBook';
import editBook from '../controllers/books/editBook';
import deleteBook from '../controllers/books/deleteBook';
import checkImageCount from '../middlewares/checkImgCount';

const booksRouter: Router = express.Router();

booksRouter.get('/', getAllBooks);
booksRouter.get('/:idBook', getBook);
booksRouter.post('/addBook', checkImageCount, addBook);
booksRouter.put('/edit/:idBook', checkImageCount, editBook);
booksRouter.delete('/:idBook', deleteBook);

export default booksRouter;