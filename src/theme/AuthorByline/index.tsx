import React from 'react';
import authors from '@site/data/authors/authors.json'; // Adjust path if necessary
import styles from './styles.module.css';
import Link from '@docusaurus/Link';

interface Author {
  id: string;
  name: string;
  title?: string;
  url?: string;
  image_url?: string;
}

interface AuthorBylineProps {
  authorIds: string[];
}

const AuthorByline: React.FC<AuthorBylineProps> = ({ authorIds }) => {
  if (!authorIds || authorIds.length === 0) {
    return null;
  }

  const authorDetails = authorIds.map(id => {
    const foundAuthor = (authors as Author[]).find(author => author.id === id);
    if (!foundAuthor) {
      console.warn(`Author with id "${id}" not found.`);
      return null;
    }
    return foundAuthor;
  }).filter(author => author !== null) as Author[];

  if (authorDetails.length === 0) {
    return null;
  }

  return (
    <div className={styles.authorBylineContainer}>
      <h4>{authorDetails.length === 1 ? 'Author' : 'Authors'}</h4>
      {authorDetails.map(author => (
        <div key={author.id} className={styles.authorItem}>
          {author.image_url && (
            <img
              src={author.image_url}
              alt={author.name}
              className={styles.authorImage}
            />
          )}
          <div className={styles.authorInfo}>
            {author.url ? (
              <Link to={author.url} className={styles.authorName}>
                {author.name}
              </Link>
            ) : (
              <span className={styles.authorName}>{author.name}</span>
            )}
            {author.title && <div className={styles.authorTitle}>{author.title}</div>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AuthorByline;
