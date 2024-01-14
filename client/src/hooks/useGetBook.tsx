import { useEffect, useState } from 'react';
import { Book } from '../types/book.type';
import { getBook } from '../services/Books';

const useGetBook = (idBook: string) => {
  const [book, setBook] = useState<Book>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadBook = async () => {
      try {
        setLoading(true);
        const data = await getBook(idBook);
        setBook(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadBook();
  }, []);
  return { book, loading };
};

export default useGetBook;