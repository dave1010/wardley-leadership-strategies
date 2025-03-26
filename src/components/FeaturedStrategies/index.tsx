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

// icons from https://uxwing.com/
// change colour with `fill="#25c2a0"`

const StrategyList: StrategyItem[] = [
  {
    title: 'Cooperation',
    Svg: require('@site/static/img/rowers.jpg').default,
    description: (
      <>
        Working with others, in partnerships, joint ventures, or industry collaborations, to achieve a common goal and create mutual value.
      </>
    ),
    link: '/strategies/accelerators/cooperation',
  },
  {
    title: 'Exploiting Network Effects',
    Svg: require('@site/static/img/network.jpg').default,
    description: (
      <>
        Leveraging tactics that increase the value of your product as more users join, creating sustainable growth.
      </>
    ),
    link: '/strategies/accelerators/exploiting-network-effects',
  },
  {
    title: 'Ambush (Tech Drops)',
    Svg: require('@site/static/img/parachute.jpg').default,
    description: (
      <>
        Surprising competitors by introducing significant technological changes to the market
        forcing competitors into a reactive position.

      </>
    ),
    link: '/strategies/competitor/ambush',
  },
];

function Strategy({title, Svg, description, link}: StrategyItem) {
  return (
    <div className={clsx('col col--4')}>
      <Link to={link}>
        <div className="card shadow--md margin-vert--md">
          <div className="text--center card__image">
            {typeof Svg === 'string' ? (
              <img src={Svg} alt={title} className={styles.featureImage} />
            ) : (
              <Svg className={styles.featureSvg} role="img" />
            )}
          </div>
          <div className="card__body">
            <h3>{title}</h3>
            <p>{description}</p>
          </div>
          <div className="card__footer">
            <button className="button button--secondary button--block">Learn more</button>
          </div>
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