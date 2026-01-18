import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import BrowserFrame from '../BrowserFrame';

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

      <div className="margin-vert--lg">
        <div className="card shadow--md padding--lg">
          <div className="row">
            <div className={clsx('col col--8', 'margin-bottom--md', styles.reverseOnMobile)}>
              <h2 className="margin-bottom--sm">New: Strategy Assessment Tool</h2>
              <p className="margin-bottom--sm" style={{ fontSize: '1.25rem' }}>
                Quickly assess how ready you are to apply each strategy with the{' '}
                <a href="/about/assessment-tool">Strategy Assessment Tool</a>.
                Explore signals in your maps and organisation that suggest a good fit, and check your readiness to execute effectively.
              </p>
              <div className={styles.buttonGroup}>
                <a className="button button--primary" href="/about/assessment-tool">
                  Try the Tool
                </a>
                <a className="button button--secondary" href="/my-progress">
                  Review Saved Assessments
                </a>
              </div>
            </div>
            <div className={clsx('col col--4')}>
              <BrowserFrame>
                <img src="/img/assessment-tool-screenshot.png" alt="Strategy assessment tool" style={{ width: '100%', borderRadius: '8px' }} />
              </BrowserFrame>
            </div>
          </div>
        </div>

        <div className="card shadow--md padding--lg margin-top--lg">
          <div className="row">
            <div className={clsx('col col--8', 'margin-bottom--md', styles.reverseOnMobile)}>
              <h2 className="margin-bottom--sm">Strategy Navigator</h2>
              <p className="margin-bottom--sm" style={{ fontSize: '1.15rem' }}>
                Need a shortlist of plays for your situation? Blend goals, landscape stages, and organisational pressures to uncover strategies that fit—then compare them side by side before you commit.
              </p>
              <ul className="margin-bottom--sm">
                <li>Filter 60+ plays by the outcomes you need.</li>
                <li>Spot climate signals, first moves, and watch-outs at a glance.</li>
                <li>Compare up to three strategies to choose the next move.</li>
              </ul>
              <a className="button button--secondary" href="/strategy-navigator">
                Open the Navigator
              </a>
            </div>
            <div className={clsx('col col--4')}>
              <BrowserFrame>
                <div className={styles.navigatorPreview}>
                  <span className={styles.navigatorBadge}>High fit</span>
                  <div className={styles.navigatorPills}>
                    <span className={styles.navigatorPill}>Accelerate adoption</span>
                    <span className={styles.navigatorPill}>Genesis</span>
                    <span className={styles.navigatorPill}>Limited resources</span>
                  </div>
                  <div className={styles.navigatorStack}>
                    <div>
                      <h4>Signals</h4>
                      <p>Map reveals complementary partners.</p>
                    </div>
                    <div>
                      <h4>Momentum</h4>
                      <p>Pilot a narrow collaboration.</p>
                    </div>
                  </div>
                </div>
              </BrowserFrame>
            </div>
          </div>
        </div>

        <div className="card shadow--md padding--lg margin-top--lg">
          <div className="row">
            <div className={clsx('col col--8', 'margin-bottom--md', styles.reverseOnMobile)}>
              <h2 className="margin-bottom--sm">Strategy Guides</h2>
              <p className="margin-bottom--sm" style={{ fontSize: '1.15rem' }}>
                Step-by-step playbooks that help teams move from map to action. Start with the{' '}
                <a href="/strategy-guides/introduction-to-strategic-play">Introduction to Strategic Play</a> guide, then explore more
                scenario-driven walkthroughs.
              </p>
              <ul className="margin-bottom--sm">
                <li>Use structured prompts to align teams on the next move.</li>
                <li>Capture signals, risks, and fast feedback loops as you play.</li>
                <li>Share a common vocabulary for strategic decisions.</li>
              </ul>
              <div className={styles.buttonGroup}>
                <a className="button button--primary" href="/strategy-guides">
                  Explore Strategy Guides
                </a>
                <a className="button button--secondary" href="/strategy-guides/introduction-to-strategic-play">
                  Read the Intro Guide
                </a>
              </div>
            </div>
            <div className={clsx('col col--4')}>
              <BrowserFrame>
                <div className={styles.guidesPreview}>
                  <span className={styles.guidesBadge}>New series</span>
                  <h3>Strategic Play</h3>
                  <p>
                    A guided walkthrough to build shared intent, pick a gameplay, and define the first experiment.
                  </p>
                  <div className={styles.guidesChecklist}>
                    <span>Map signal check</span>
                    <span>Gameplay selection</span>
                    <span>First move planning</span>
                  </div>
                </div>
              </BrowserFrame>
            </div>
          </div>
        </div>
      </div>

    </div>

    </section>
  );
}
