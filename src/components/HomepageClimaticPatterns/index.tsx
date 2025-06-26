import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import styles from '../HomepageFeatures/styles.module.css';

export default function HomepageClimaticPatterns(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={clsx(styles.miniHero, 'margin-vert--lg')}>
          <div className="container">
            <h2 className={styles.miniHero__title}>
              <Link to="/climatic-patterns">Climatic Patterns</Link>
            </h2>
            <p className={styles.miniHero__subtitle}>
              Understand the forces shaping markets over time and anticipate change.
            </p>
            <div>
              <h3>Browse categories</h3>
              <p className={styles.categoryLinks}>
                <a className="margin-right--sm margin-bottom--sm button button--outline button--primary" href="/climatic-patterns#components">Components</a>
                <a className="margin-right--sm margin-bottom--sm button button--outline button--primary" href="/climatic-patterns#competitors">Competitors</a>
                <a className="margin-right--sm margin-bottom--sm button button--outline button--primary" href="/climatic-patterns#financial">Financial</a>
                <a className="margin-right--sm margin-bottom--sm button button--outline button--primary" href="/climatic-patterns#inertia">Inertia</a>
                <a className="margin-right--sm margin-bottom--sm button button--outline button--primary" href="/climatic-patterns#prediction">Prediction</a>
                <a className="margin-right--sm margin-bottom--sm button button--outline button--primary" href="/climatic-patterns#speed">Speed</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
