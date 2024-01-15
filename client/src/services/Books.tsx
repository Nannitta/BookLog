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
  } catch (err) {
    console.error(err);
  }  
};

export const addBook = async (addedBook: Book, cover: any) => {
  const addedBookForm = new FormData();
  addedBookForm.append('cover', cover);
  if(addedBook.title) {
    addedBookForm.append('title', addedBook.title);
  }
  if(addedBook.author) {
    addedBookForm.append('author', addedBook.author);
  }
  if(addedBook.editorial) {
    addedBookForm.append('editorial', addedBook.editorial);
  }
  if(addedBook.yearRelease) {
    addedBookForm.append('yearRelease', addedBook.yearRelease);
  }
  if(addedBook.resume) {
    addedBookForm.append('resume', addedBook.resume);
  }

  try {
    await fetch(`${BACK_API}/addBook`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: addedBookForm
    });
  } catch (err) {
    console.error(err);
  }
};

export const deleteBookService = async (idBook: string) => {  
  await fetch(`${BACK_API}/${idBook}`, {
    method: 'DELETE'
  });
};