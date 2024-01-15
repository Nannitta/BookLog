import {BACK_API} from '@env';
import { Book } from '../types/book.type';

export const getAllBooks = async () => {
  const data = await fetch(`${BACK_API}`);

  const allBooks = await data.json();

  return allBooks;  
};


export const getBook = async (idBook: string) => { 
  const data = await fetch(`${BACK_API}/${idBook}`);

  const book = await data.json();

  return book;
};

export const editBook = async (idBook: string, refreshBook: Book, cover: any) => {
  const editBookForm = new FormData();
  editBookForm.append('cover', cover);
  if(refreshBook.title) {
    editBookForm.append('title', refreshBook.title);
  }
  if(refreshBook.author) {
    editBookForm.append('author', refreshBook.author);
  }
  if(refreshBook.editorial) {
    editBookForm.append('editorial', refreshBook.editorial);
  }
  if(refreshBook.yearRelease) {
    editBookForm.append('yearRelease', refreshBook.yearRelease);
  }
  if(refreshBook.resume) {
    editBookForm.append('resume', refreshBook.resume);
  }
    
  try {
    await fetch(`${BACK_API}/edit/${idBook}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: editBookForm
    });   
  } catch (error) {
    console.log(error);
  }  
}; 