import express, { Request, Response } from 'express';
import 'dotenv/config';
import { CustomError } from './helpers/errorHandler';
import booksRouter from './routes/booksRouter';

const { PORT } = process.env;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false, limit: '10mb' }));

app.use('/', booksRouter);

app.use((err: CustomError, _:Request, res: Response) => {
  console.error(err);

  const errorCode: number = err.statusCode ?? 500;

  res.status(errorCode).send({
    error: err.message
  });
});

app.use((_: Request, res: Response) => {
  res.status(404).send({
    message: 'No encontrado',
  });
});

app.listen(PORT || 3000, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});