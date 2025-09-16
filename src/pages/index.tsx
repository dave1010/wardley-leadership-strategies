import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import FeaturedStrategies from '@site/src/components/FeaturedStrategies';
import HomepageClimaticPatterns from '@site/src/components/HomepageClimaticPatterns';
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
            className="button button--secondary button--lg"
            to="/about">
            Learn More
          </Link>
          <Link
            className="button button--outline button--lg"
            to="/strategy-explorer">
            Strategy Explorer
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
      </main>
    </Layout>
  );
}
