import { useEffect, useState } from 'react';
import { Book } from '../types/book.type';
import { getBook } from '../services/Books';

const useGetBook = (idBook: string) => {
  const [book, setBook] = useState<Book>();
  const [loading, setLoading] = useState<boolean>(false);

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

  useEffect(() => {
    loadBook();
  }, []);

  const refetchUseGetBook = () => {
    loadBook();
  };

  return { book, loading, refetchUseGetBook };
};

export default useGetBook;