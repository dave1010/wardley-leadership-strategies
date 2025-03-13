import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/strategies">
            Explore the Strategies ♟️
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
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <div>
          Wardley Mapping provides a visual way to understand business landscapes and anticipate strategic moves. With situational awareness from maps, leaders can employ various **strategic plays** (or "gameplays") suited to their context. Below, we detail 60+ known Wardley Mapping leadership strategies, grouped by theme (Offensive, Defensive, Ecosystem, etc.). Each strategy entry includes a definition, explanation, examples, guidance on usage, pitfalls, related plays, and references. The guide assumes you're familiar with Wardley Mapping concepts (e.g. value chain, evolution stages) and general business strategy.
        </div>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
