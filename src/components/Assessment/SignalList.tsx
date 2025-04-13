import React, { useState, useEffect } from 'react';
import { Check, CircleHelp, X } from 'lucide-react';
import styles from './SignalList.module.css';

type TrafficLight = 'green' | 'amber' | 'red';

interface SignalListProps {
  title: string;
  description: string;
  items: string[];
  onScoreChange: (score: number) => void;
}

const calcScore = (values: TrafficLight[]): number => {
  const score = values.reduce((acc, val) => {
    if (val === 'green') return acc + 100;
    if (val === 'amber') return acc + 50;
    return acc;
  }, 0);
  return Math.round(score / values.length);
};

const nextState = (state: TrafficLight): TrafficLight =>
  state === 'amber' ? 'green' : state === 'green' ? 'red' : 'amber';

const stateTranslate = {
  red: '0.1rem',
  amber: '1.7rem',
  green: '3.3rem'
};

const stateColor = {
  red: 'var(--ifm-color-danger-lightest)',
  amber: 'var(--ifm-color-warning-lightest)',
  green: 'var(--ifm-color-success-lightest)'
};

const SignalList: React.FC<SignalListProps> = ({ title, description, items, onScoreChange }) => {
  const [selected, setSelected] = useState<TrafficLight[]>(Array(items.length).fill('amber'));

  const update = (index: number) => {
    const next = [...selected];
    next[index] = nextState(next[index]);
    setSelected(next);
  };

  useEffect(() => {
    onScoreChange(calcScore(selected));
  }, [selected]);

  const renderIcons = (current: TrafficLight) => {
    return (
      <div className={styles.iconGroup}>
        <div
          className={`${styles.iconSlider} ${styles[current]}`}
          style={{
            transform: `translateX(${stateTranslate[current]})`,
          }}
        />
        <div className={styles.iconWrapper}><X size={18} /></div>
        <div className={styles.iconWrapper}><CircleHelp size={18} /></div>
        <div className={styles.iconWrapper}><Check size={18} /></div>
      </div>
    );
  };

  return (
    <div className="margin-top--md">
      <h3>{title}</h3>
      <p>{description}</p>
      <ul className="padding--none">
        {items.map((text, idx) => (
          <li
            key={idx}
            className={`card padding--sm margin-bottom--sm ${styles.signalItem}`}
            onClick={() => update(idx)}
          >
            <div className="margin-right--sm">
              {renderIcons(selected[idx])}
            </div>
            <span>{text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SignalList;
