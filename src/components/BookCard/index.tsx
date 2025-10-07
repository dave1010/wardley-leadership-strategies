import React from 'react';
import clsx from 'clsx';

import styles from './styles.module.css';

export type BookCardProps = {
  title: string;
  authors?: string[];
  isbn13: string;
  year?: number | null;
  summary?: string;
  tags?: string[];
};

const coverUrl = (isbn: string, size: 'S' | 'M' | 'L' = 'L') =>
  `https://covers.openlibrary.org/b/isbn/${isbn}-${size}.jpg`;

const bookshopUrl = (isbn: string, affiliateId?: string) =>
  affiliateId
    ? `https://bookshop.org/a/${affiliateId}/${isbn}`
    : `https://bookshop.org/book/${isbn}`;

const worldcatUrl = (isbn: string) => `https://worldcat.org/isbn/${isbn}`;

function normaliseList(values: string[] | undefined): string[] {
  return (values ?? [])
    .map((value) => value.trim())
    .filter((value) => value.length > 0);
}

export default function BookCard({
  title,
  authors,
  isbn13,
  year,
  summary,
  tags,
}: BookCardProps): React.ReactElement {
  const affiliateId =
    typeof process !== 'undefined' && process.env?.BOOKSHOP_AFFILIATE_ID
      ? process.env.BOOKSHOP_AFFILIATE_ID
      : undefined;
  const authorList = normaliseList(authors);
  const tagList = normaliseList(tags);
  const summaryText = summary?.trim();
  const publicationYear = typeof year === 'number' ? year : undefined;

  return (
    <article className={clsx('card', styles.card)}>
      <div className={styles.cover}>
        <img
          src={coverUrl(isbn13)}
          alt={`Cover of ${title}`}
          loading="lazy"
          width={96}
          height={144}
          onError={(event) => {
            const image = event.currentTarget;
            image.onerror = null;
            image.src = '/img/book.svg';
          }}
        />
      </div>
      <div className={styles.details}>
        <h3 className={styles.title}>
          {title}
          {publicationYear ? ` (${publicationYear})` : ''}
        </h3>
        {authorList.length > 0 && (
          <p className={styles.authors}>{authorList.join(', ')}</p>
        )}
        {summaryText && <p className={styles.summary}>{summaryText}</p>}
        {tagList.length > 0 && (
          <ul className={styles.tags}>
            {tagList.map((tag) => (
              <li key={tag} className={styles.tag}>
                {tag}
              </li>
            ))}
          </ul>
        )}
        <div className={styles.actions}>
          <a
            className={clsx('button', 'button--primary')}
            rel="nofollow sponsored"
            href={bookshopUrl(isbn13, affiliateId)}
          >
            Buy on Bookshop.org
          </a>
          <a
            className={clsx('button', 'button--secondary')}
            href={`https://openlibrary.org/isbn/${isbn13}`}
          >
            Open Library
          </a>
          <a
            className={clsx('button', 'button--secondary')}
            href={worldcatUrl(isbn13)}
          >
            Find in a library
          </a>
        </div>
      </div>
    </article>
  );
}
