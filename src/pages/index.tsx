import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import FeaturedStrategies from '@site/src/components/FeaturedStrategies';
import HomepageClimaticPatterns from '@site/src/components/HomepageClimaticPatterns';
import HomepageLatestBlogPosts from '@site/src/components/HomepageLatestBlogPosts';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title text--secondary">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--primary button--lg"
            to="/strategies">
            Explore Strategies
          </Link>
          <Link
            className={clsx('button button--secondary button--lg', styles.navigatorButton)}
            to="/strategy-navigator">
            Strategy Navigator
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="/about">
            Learn More
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="The Compendium of Wardley Mapping Leadership Gameplays and Strategies">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <FeaturedStrategies />
        <HomepageClimaticPatterns />
        <HomepageLatestBlogPosts />
      </main>
    </Layout>
  );
}
