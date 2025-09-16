import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import clsx from 'clsx';
import StrategyExplorer from '@site/src/components/StrategyExplorer';
import styles from './styles.module.css';

export default function StrategyExplorerPage(): ReactNode {
  return (
    <Layout
      title="Strategy Explorer"
      description="Filter Wardley Mapping strategies by context, evolution stage, and leadership skills to find the best fit for your situation.">
      <header className={clsx('hero hero--primary', styles.hero)}>
        <div className="container">
          <Heading as="h1" className="hero__title text--secondary">
            Strategy Explorer
          </Heading>
          <p className="hero__subtitle">
            Quickly narrow down 60+ Wardley strategies based on the landscape you are facing.
            Combine filters to surface plays that match your signals, organisational readiness, and ethical stance.
          </p>
        </div>
      </header>
      <main className="container margin-vert--lg">
        <StrategyExplorer />
      </main>
    </Layout>
  );
}
