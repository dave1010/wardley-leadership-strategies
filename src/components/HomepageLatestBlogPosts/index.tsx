import React from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import clsx from 'clsx';
import blogPostList from '@generated/docusaurus-plugin-content-blog/default/blog-post-list-prop-default.json';

import styles from './styles.module.css';

type BlogSidebar = typeof blogPostList;
type BlogSidebarItem = BlogSidebar['items'][number];

const sidebar = blogPostList;

function formatDate(value?: string): string | undefined {
  if (!value) {
    return undefined;
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return undefined;
  }

  return new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
}

export default function HomepageLatestBlogPosts(): React.ReactElement | null {
  const posts = React.useMemo(
    () =>
      (sidebar.items ?? [])
        .filter((item) => !item.unlisted)
        .slice(0, 5),
    [],
  );

  if (!posts.length) {
    return null;
  }

  return (
    <section className={styles.section}>
      <div className={clsx('container', styles.wrapper)}>
        <Heading as="h2" className="text--center">
          Latest from the blog
        </Heading>
        <p className={clsx('text--center', styles.intro)}>
          Fresh thinking on AI, leadership, and Wardley Mapping.
        </p>
        <div className={styles.postsGrid}>
          {posts.map((post) => {
            const formattedDate = formatDate(post.date);
            return (
              <article key={post.permalink} className={styles.postCard}>
                {formattedDate && (
                  <time className={styles.postDate} dateTime={post.date}>
                    {formattedDate}
                  </time>
                )}
                <Heading as="h3" className={styles.postTitle}>
                  <Link to={post.permalink}>{post.title}</Link>
                </Heading>
                <Link className={styles.readMore} to={post.permalink}>
                  Read more →
                </Link>
              </article>
            );
          })}
        </div>
        <div className={styles.ctaWrapper}>
          <Link className="button button--primary button--lg" to="/blog">
            View all posts
          </Link>
        </div>
      </div>
    </section>
  );
}
