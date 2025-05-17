import React from 'react';
import styles from './BrowserFrame.module.css';

interface BrowserFrameProps {
  url?: string;
  children: React.ReactNode;
}

export default function BrowserFrame({ url = 'wardleyleadershipstrategies.com', children }: BrowserFrameProps) {
  return (
    <div className={styles.browserFrame}>
      <div className={styles.browserHeader}>
        <div className={styles.circles}>
          <span className={`${styles.circle} ${styles.red}`} />
          <span className={`${styles.circle} ${styles.yellow}`} />
          <span className={`${styles.circle} ${styles.green}`} />
        </div>
        <div className={styles.urlBar}>{url}</div>
        <div className={styles.menuIcon}>
          <span />
          <span />
          <span />
        </div>
      </div>
      <div className={styles.browserContent}>
        {children}
      </div>
    </div>
  );
}
