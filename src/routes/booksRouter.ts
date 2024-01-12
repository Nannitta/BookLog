import express, { Router } from 'express';
import multer from 'multer';
import getAllBooks from '../controllers/books/getAllBooks';
import getBook from '../controllers/books/getBook';
import addBook from '../controllers/books/addBook';
import editBook from '../controllers/books/editBook';
import deleteBook from '../controllers/books/deleteBook';

const booksRouter: Router = express.Router();

const storage: multer.StorageEngine = multer.memoryStorage();
const upload: multer.Multer = multer({ storage: storage });

booksRouter.get('/', getAllBooks);
booksRouter.get('/:idBook', getBook);
booksRouter.post('/addBook', upload.single('cover'), addBook);
booksRouter.put('/edit/:idBook', editBook);
booksRouter.delete('/:idBook', deleteBook);

export default booksRouter;