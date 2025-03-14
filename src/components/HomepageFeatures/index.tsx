import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Actionable Insights, Not Just Theory',
    Svg: require('@site/static/img/rules-icon.svg').default,
    description: (
      <>
        Translate your Wardley Maps into concrete actions with detailed explanations and
        real-world examples of each strategy.
      </>),
  },
  {
    title: 'Beyond the Basics: 60+ Strategies',
    Svg: require('@site/static/img/book.svg').default,
    description: (
      <>
        Explore a comprehensive library of gameplays, covering a wide range of scenarios
        and competitive situations.
      </>
    ),
  },
  {
    title: 'Community-Driven and Constantly Evolving',
    Svg: require('@site/static/img/pencil-icon.svg').default,
    description: (
      <>
        Benefit from an open resource that is continuously updated and improved
        by a community of Wardley Mapping practitioners.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
