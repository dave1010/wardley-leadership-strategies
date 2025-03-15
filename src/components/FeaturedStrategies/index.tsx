import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

type StrategyItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: React.ReactNode;
  link: string;
};

const StrategyList: StrategyItem[] = [
  {
    title: 'Co-operation',
    Svg: require('@site/static/img/cooperation.svg').default,
    description: (
      <>
        Working with others, even competitors, to achieve a goal.
      </>
    ),
    link: '/strategies/accelerators/co-operation',
  },
  {
    title: 'Exploiting Network Effects',
    Svg: require('@site/static/img/network.svg').default,
    description: (
      <>
        Leveraging tactics that increase the value of your product as more users join.
      </>
    ),
    link: '/strategies/accelerators/exploiting-network-effects',
  },
  // Add more strategies as needed
];

function Strategy({title, Svg, description, link}: StrategyItem) {
  return (
    <div className={clsx('col col--4')}>
              <Link to={link} className="text--center">

      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      </Link>

    </div>
  );
}

export default function FeaturedStrategies(): React.ReactNode {
    return (
        <section className={styles.features}>
            <div className="container">
                <h2 className="text--center">Featured Strategies</h2>
                <div className="row">
                    {StrategyList.map((props, idx) => (
                        <Strategy key={idx} {...props} />
                    ))}
                </div>
            </div>
        </section>
    );
}