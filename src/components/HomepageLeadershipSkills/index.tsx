import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import styles from '../HomepageFeatures/styles.module.css';

export default function HomepageLeadershipSkills(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={clsx(styles.miniHero, 'margin-vert--lg')}>
          <div className="container">
            <h2 className={styles.miniHero__title}>
              <Link to="/leadership-skills">Leadership Skills</Link>
            </h2>
            <p className={styles.miniHero__subtitle}>
              Build the leadership capabilities that turn Wardley insights into decisive action.
            </p>
            <div>
              <h3>Browse skills</h3>
              <p className={styles.categoryLinks}>
                <a className="margin-right--sm margin-bottom--sm button button--outline button--primary" href="/leadership-skills#sensemaking-and-analysis">Sensemaking &amp; analysis</a>
                <a className="margin-right--sm margin-bottom--sm button button--outline button--primary" href="/leadership-skills#market-and-commercial-strategy">Market &amp; commercial</a>
                <a className="margin-right--sm margin-bottom--sm button button--outline button--primary" href="/leadership-skills#competitive-positioning-and-game-dynamics">Competitive dynamics</a>
                <a className="margin-right--sm margin-bottom--sm button button--outline button--primary" href="/leadership-skills#ecosystems-platforms-and-standards">Ecosystems &amp; platforms</a>
                <a className="margin-right--sm margin-bottom--sm button button--outline button--primary" href="/leadership-skills#governance-risk-and-ethics">Governance &amp; risk</a>
                <a className="margin-right--sm margin-bottom--sm button button--outline button--primary" href="/leadership-skills#execution-and-transformation">Execution &amp; change</a>
                <a className="margin-right--sm margin-bottom--sm button button--outline button--primary" href="/leadership-skills#innovation-and-learning">Innovation &amp; learning</a>
                <a className="margin-right--sm margin-bottom--sm button button--outline button--primary" href="/leadership-skills#influence-negotiation-and-conflict">Influence &amp; negotiation</a>
                <a className="margin-right--sm margin-bottom--sm button button--outline button--primary" href="/leadership-skills#people-and-culture">People &amp; culture</a>
                <a className="margin-right--sm margin-bottom--sm button button--outline button--primary" href="/leadership-skills#legal-regulatory-and-security">Legal &amp; security</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
