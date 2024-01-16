import { useEffect, useState } from 'react';
import { Book } from '../types/book.type';
import { getAllBooks } from '../services/Books';

const useAllBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const loadAllBooks = async () => {
    try {
      setLoading(true);
      const data = await getAllBooks();
      setBooks(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllBooks();
  }, []);

  const refetchUseGetAllBooks = () => {
    loadAllBooks();
  };

  return { books, loading, refetchUseGetAllBooks };
};

export default useAllBooks;