import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

type StrategyItem = {
  title: string;
  imageUrl: string; // Renamed from Svg
  description: React.ReactNode;
  link: string;
};

// icons from https://uxwing.com/
// change colour with `fill="#25c2a0"`

const StrategyList: StrategyItem[] = [
  {
    title: 'Cooperation',
    imageUrl: require('@site/static/img/rowers.jpg').default,
    description: (
      <>
        Working with others, in partnerships, joint ventures, or industry collaborations, to achieve a common goal and create mutual value.
      </>
    ),
    link: '/strategies/accelerators/cooperation',
  },
  {
    title: 'Exploiting Network Effects',
    imageUrl: require('@site/static/img/network.jpg').default,
    description: (
      <>
        Leveraging tactics that increase the value of your product as more users join, creating sustainable growth.
      </>
    ),
    link: '/strategies/accelerators/exploiting-network-effects',
  },
  {
    title: 'Tech Drops',
    imageUrl: require('@site/static/img/parachute.jpg').default,
    description: (
      <>
        Surprising competitors by introducing significant technological changes to the market
        forcing competitors into a reactive position.

      </>
    ),
    link: '/strategies/competitor/tech-drops',
  },
  {
    title: 'Refactoring',
    imageUrl: require('@site/static/img/refactoring.jpg').default,
    description: (
      <>
        Internally breaking apart, reorganizing and repurposing components of a legacy system to salvage value or reduce toxicity.
      </>
    ),
    link: '/strategies/dealing-with-toxicity/refactoring/'
  },
  {
    title: 'Artificial Competition',
    imageUrl: require('@site/static/img/artificial-competition.jpg').default,
    description: (
      <>
        Creating the illusion of competition by establishing or funding a secondary entity that competes with your own offerings.
      </>
    ),
    link: '/strategies/user-perception/artificial-competition'
  },
  {
    title: 'Fragmentation',
    imageUrl: require('@site/static/img/fragmentation.jpg').default,
    description: (
      <>
        Undermine a competitor by changing the market dynamics around them, fragmenting their stronghold into smaller pieces.
      </>
    ),
    link: '/strategies/competitor/fragmentation'
  }
];

function Strategy({title, imageUrl, description, link}: StrategyItem) {
  return (
    <div className={clsx('col col--4')}>
      <Link to={link}>
        <div className="card shadow--md margin-vert--md">
          <div className="text--center card__image">
            <img src={imageUrl} alt={title} className={styles.featureImage} />
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