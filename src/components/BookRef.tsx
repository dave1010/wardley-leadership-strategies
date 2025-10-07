import React from 'react';
import Link from '@docusaurus/Link';
import {usePluginData} from '@docusaurus/useGlobalData';

interface BookSummary {
  slug: string;
  title: string;
  authors: string[];
  isbn13: string;
  year: number | null;
  tags: string[];
  summary: string;
}

interface BooksIndexData {
  dataPath: string;
  count: number;
}

export default function BookRef({isbn}: {isbn: string}) {
  const {dataPath} = usePluginData('books-index') as BooksIndexData;
  const [book, setBook] = React.useState<BookSummary | undefined>();

  React.useEffect(() => {
    let cancelled = false;

    import(/* webpackChunkName: "books-index" */ `@generated/${dataPath}`).then((mod) => {
      if (cancelled) {
        return;
      }
      const books: BookSummary[] = mod.default ?? mod;
      setBook(books.find((entry) => entry.isbn13 === isbn));
    });

    return () => {
      cancelled = true;
    };
  }, [dataPath, isbn]);

  if (!book) {
    return <>{isbn}</>;
  }

  return <Link to={book.slug}>{book.title}</Link>;
}
