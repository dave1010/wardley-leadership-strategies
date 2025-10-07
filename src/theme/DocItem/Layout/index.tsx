/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import {useWindowSize} from '@docusaurus/theme-common';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import {usePluginData} from '@docusaurus/useGlobalData';
import DocItemPaginator from '@theme/DocItem/Paginator';
import DocVersionBanner from '@theme/DocVersionBanner';
import DocVersionBadge from '@theme/DocVersionBadge';
import DocItemFooter from '@theme/DocItem/Footer';
import DocItemTOCMobile from '@theme/DocItem/TOC/Mobile';
import DocItemTOCDesktop from '@theme/DocItem/TOC/Desktop';
import AuthorByline from '@site/src/theme/AuthorByline';
import DocItemContent from '@theme/DocItem/Content';
import DocBreadcrumbs from '@theme/DocBreadcrumbs';
import ContentVisibility from '@theme/ContentVisibility';
import type {Props} from '@theme/DocItem/Layout';
import BookCard, {type BookCardProps} from '@site/src/components/BookCard';

import styles from './styles.module.css';

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

function ensureStringArray(value: unknown): string[] | undefined {
  if (!Array.isArray(value)) {
    return undefined;
  }

  const filtered = value.filter((item): item is string => typeof item === 'string');

  return filtered.length > 0 ? filtered : undefined;
}

function ensureString(value: unknown): string | undefined {
  if (typeof value !== 'string') {
    return undefined;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function ensureNumber(value: unknown): number | undefined {
  return typeof value === 'number' && Number.isFinite(value) ? value : undefined;
}

/**
 * Decide if the toc should be rendered, on mobile or desktop viewports
 */
function useDocTOC() {
  const {frontMatter, toc} = useDoc();
  const windowSize = useWindowSize();

  const hidden = frontMatter.hide_table_of_contents;
  const canRender = !hidden && toc.length > 0;

  const mobile = canRender ? <DocItemTOCMobile /> : undefined;

  const desktop =
    canRender && (windowSize === 'desktop' || windowSize === 'ssr') ? (
      <DocItemTOCDesktop />
    ) : undefined;

  return {
    hidden,
    mobile,
    desktop,
  };
}

export default function DocItemLayout({children}: Props): ReactNode {
  const docTOC = useDocTOC();
  const {metadata, frontMatter} = useDoc();
  const frontMatterRecord = frontMatter as Record<string, unknown>;
  const booksIndex = usePluginData('books-index') as BooksIndexData | undefined;
  const docAuthors = ensureStringArray(frontMatterRecord.authors);

  const bookCardProps = React.useMemo(() => {
    const permalink = metadata.permalink?.replace(/\/$/, '') ?? '';
    const isbn = ensureString(frontMatterRecord.isbn13);
    const isBookPage = permalink.startsWith('/books/');

    if (!isBookPage || !isbn) {
      return undefined;
    }

    const bookFromIndex = booksIndex?.books?.find(
      (entry) => entry.isbn13 === isbn || entry.slug === permalink,
    );

    const authors =
      ensureStringArray(frontMatterRecord.bookAuthors) ?? bookFromIndex?.authors ?? [];
    const summary =
      ensureString(frontMatterRecord.summary) ?? bookFromIndex?.summary ?? metadata.description;
    const tags = ensureStringArray(frontMatterRecord.bookTags) ?? bookFromIndex?.tags ?? [];
    const year =
      ensureNumber(frontMatterRecord.year) ?? ensureNumber(bookFromIndex?.year ?? undefined);

    const card: BookCardProps = {
      title: bookFromIndex?.title ?? metadata.title,
      authors,
      isbn13: isbn,
      year: year ?? undefined,
      summary,
      tags,
    };

    return card;
  }, [booksIndex, frontMatter, metadata.description, metadata.permalink, metadata.title]);

  return (
    <div className="row">
      <div className={clsx('col', !docTOC.hidden && styles.docItemCol)}>
        <ContentVisibility metadata={metadata} />
        <DocVersionBanner />
        <div className={styles.docItemContainer}>
          <article>
            <DocBreadcrumbs />
            <DocVersionBadge />
            {docTOC.mobile}
            <DocItemContent>{children}</DocItemContent>
            <DocItemFooter />
            {docAuthors && docAuthors.length > 0 && (
              <AuthorByline authorIds={docAuthors} />
            )}
            {bookCardProps && (
              <div className="margin-top--lg">
                <BookCard {...bookCardProps} />
              </div>
            )}
          </article>
          <DocItemPaginator />
        </div>
      </div>
      {docTOC.desktop && <div className="col col--3">{docTOC.desktop}</div>}
    </div>
  );
}
