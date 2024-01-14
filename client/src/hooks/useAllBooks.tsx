import { useEffect, useState } from 'react';
import { Book } from '../types/book.type';
import { getAllBooks } from '../services/getAllBooks';

const useAllBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
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

    loadAllBooks();
  }, []);
  return { books, loading };
};

export default useAllBooks;