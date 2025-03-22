import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
    <div className="container">
      <div className="row">
        <div className={clsx('col col--8')}>
          <div className="hero shadow--md margin-vert--lg">
            <div className="container">
              <h2 className="hero__title"><a href="/strategies">60+ Leadership Strategies</a></h2>
              <p className="hero__subtitle">
                Translate your Wardley Maps into concrete actions with detailed explanations and real-world examples.
                Explore gameplays covering a wide range of scenarios and competitive situations to gain strategic advantage.
              </p>
              <div>
                <h3>Browse categories</h3>
                <p>
                  <a className="margin-right--sm margin-bottom--sm button button--outline button--primary" href="/strategies/accelerators">Accelerators</a>
                  <a className="margin-right--sm margin-bottom--sm button button--outline button--primary" href="/strategies/attacking">Attacking</a>
                  <a className="margin-right--sm margin-bottom--sm button button--outline button--primary" href="/strategies/competitor">Competitor</a>
                  <a className="margin-right--sm margin-bottom--sm button button--outline button--primary" href="/strategies/dealing-with-toxicity">Dealing with Toxicity</a>
                  <a className="margin-right--sm margin-bottom--sm button button--outline button--primary" href="/strategies/decelerators">Decelerators</a>
                  <a className="margin-right--sm margin-bottom--sm button button--outline button--primary" href="/strategies/defensive">Defensive</a>
                  <a className="margin-right--sm margin-bottom--sm button button--outline button--primary" href="/strategies/ecosystem">Ecosystem</a>
                  <a className="margin-right--sm margin-bottom--sm button button--outline button--primary" href="/strategies/markets">Markets</a>
                  <a className="margin-right--sm margin-bottom--sm button button--outline button--primary" href="/strategies/poison">Poison</a>
                  <a className="margin-right--sm margin-bottom--sm button button--outline button--primary" href="/strategies/positional">Positional</a>
                  <a className="margin-right--sm margin-bottom--sm button button--outline button--primary" href="/strategies/user-perception">User Perception</a>
                </p>
              </div>
            </div>
          </div>      
        </div>

        <div className={clsx('col col--4')}>

        <div className={`${styles.miniHero} margin-vert--lg`}>
            <div className="container">
              <h2 className={styles.miniHero__title}>What is this site?</h2>
              <p className={styles.miniHero__subtitle}>
                <p>Wardley Maps are visual tools that help you understand your competitive environment and make smarter strategic choices.</p>
                <p><strong>Wardley Leadership Strategies</strong> is a practical, community-driven guide focused on actionable leadership strategies,
                shared openly under a Creative Commons license.</p>
                <p>Explore, contribute, and help continuously improve this resource.</p>
              </p>
              <div>
                  <a className="margin-right--sm margin-bottom--sm button button--primary" href="/about">Learn More</a>
              </div>
            </div>
          </div>      
        </div>


      </div>

    </div>

    </section>
  );
}
