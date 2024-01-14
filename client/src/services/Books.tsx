import {BACK_API} from '@env';

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