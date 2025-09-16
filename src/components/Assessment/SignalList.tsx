import React, { useEffect, useMemo, useState } from 'react';
import { Check, CircleHelp, X } from 'lucide-react';
import styles from './SignalList.module.css';
import {
  clearSectionState,
  isStorageAvailable,
  loadSectionState,
  saveSectionState,
} from '@site/src/utils/assessmentStorage';
import { AssessmentSection, TrafficLight } from './types';

interface SignalListProps {
  title: string;
  description: string;
  items: string[];
  section: AssessmentSection;
  storageId: string;
  onChange: (score: number, values: TrafficLight[], hasInteracted: boolean) => void;
}

export const calcScore = (values: TrafficLight[]): number => {
  if (values.length === 0) {
    return 0;
  }
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
  green: '3.3rem',
};

const SignalList: React.FC<SignalListProps> = ({
  title,
  description,
  items,
  storageId,
  section,
  onChange,
}) => {
  const defaultValues = useMemo(
    () => Array<TrafficLight>(items.length).fill('amber'),
    [items.length],
  );
  const [selected, setSelected] = useState<TrafficLight[]>(defaultValues);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [initialised, setInitialised] = useState(false);

  useEffect(() => {
    setSelected((current) => {
      if (current.length === items.length) {
        return current;
      }
      const next = Array<TrafficLight>(items.length).fill('amber');
      current.slice(0, items.length).forEach((value, index) => {
        next[index] = value;
      });
      return next;
    });
  }, [items.length]);

  useEffect(() => {
    if (!storageId || !isStorageAvailable()) {
      setInitialised(true);
      return;
    }

    const stored = loadSectionState(storageId, section);
    if (stored && stored.values.length) {
      setSelected((current) => {
        const next = Array<TrafficLight>(items.length).fill('amber');
        stored.values.slice(0, items.length).forEach((value, index) => {
          next[index] = value;
        });
        // If stored values shorter than items, keep existing for remaining
        if (stored.values.length < items.length) {
          current.slice(stored.values.length).forEach((value, index) => {
            next[stored.values.length + index] = value;
          });
        }
        return next;
      });
      setHasInteracted(true);
    }
    setInitialised(true);
  }, [items.length, section, storageId]);

  useEffect(() => {
    if (!initialised) {
      return;
    }
    const score = calcScore(selected);
    onChange(score, selected, hasInteracted);

    if (!storageId || !isStorageAvailable()) {
      return;
    }
    if (hasInteracted) {
      saveSectionState(storageId, section, selected);
    } else {
      clearSectionState(storageId, section);
    }
  }, [selected, hasInteracted, initialised, onChange, section, storageId]);

  const update = (index: number) => {
    setSelected((current) => {
      const next = [...current];
      next[index] = nextState(next[index]);
      return next;
    });
    setHasInteracted(true);
  };

  const reset = () => {
    setSelected(Array<TrafficLight>(items.length).fill('amber'));
    setHasInteracted(false);
  };

  const renderIcons = (current: TrafficLight) => (
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

  return (
    <div className="margin-top--md" id="assessment-tool">
      <div className={styles.headerRow}>
        <div>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
        <button
          type="button"
          className={styles.resetButton}
          onClick={reset}
          disabled={!hasInteracted}
        >
          Reset
        </button>
      </div>
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
