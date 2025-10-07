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
  books: BookSummary[];
}

export default function BookRef({isbn}: {isbn: string}) {
  const {books} = usePluginData('books-index') as BooksIndexData;
  const book = React.useMemo(
    () => books?.find((entry) => entry.isbn13 === isbn),
    [books, isbn],
  );

  if (!book) {
    return <>{isbn}</>;
  }

  return <Link to={book.slug}>{book.title}</Link>;
}
