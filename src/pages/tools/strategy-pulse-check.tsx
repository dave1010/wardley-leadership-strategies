import type {ReactNode} from 'react';
import {useEffect, useMemo, useState} from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import clsx from 'clsx';
import styles from './strategy-pulse-check.module.css';

const STORAGE_KEY = 'wardley-strategy-pulse-check';

type PulseSnapshot = {
  id: string;
  label: string;
  timestamp: string;
  turbulence: number;
  competitivePressure: number;
  executionReadiness: number;
  alignment: number;
};

type MetricKey = 'turbulence' | 'competitivePressure' | 'executionReadiness' | 'alignment';

const metricDescriptions: Record<MetricKey, string> = {
  turbulence: 'How fast the landscape is shifting and how noisy the signals feel.',
  competitivePressure: 'How intense the competitive moves are right now.',
  executionReadiness: 'Your ability to execute the next move quickly and confidently.',
  alignment: 'How aligned leadership and teams are on the current map and priorities.',
};

const levelDescriptions: Record<MetricKey, Record<number, string>> = {
  turbulence: {
    1: 'Stable: the landscape is calm and changes are incremental.',
    2: 'Mild drift: a few signals are emerging but priorities feel steady.',
    3: 'Active: changes are noticeable and require monthly attention.',
    4: 'Volatile: signals shift weekly and assumptions expire quickly.',
    5: 'Chaotic: constant disruption forces rapid experimentation.',
  },
  competitivePressure: {
    1: 'Quiet: competitors are largely steady or focused elsewhere.',
    2: 'Watchful: a few probes appear but moves are contained.',
    3: 'Engaged: competitive moves are frequent and visible.',
    4: 'Aggressive: rivals are making bold plays or pricing swings.',
    5: 'All-out: win-lose battles are accelerating every week.',
  },
  executionReadiness: {
    1: 'Unprepared: delivery is blocked or missing core capability.',
    2: 'Fragile: limited bandwidth and shaky execution confidence.',
    3: 'Capable: teams can deliver with focus and clear trade-offs.',
    4: 'Ready: resources and muscle memory are in place for fast moves.',
    5: 'Peak: execution is sharp, repeatable, and fast-moving.',
  },
  alignment: {
    1: 'Fractured: leadership is split on the map and priorities.',
    2: 'Patchy: partial alignment but key teams are drifting.',
    3: 'Shared: most leaders agree on priorities and intent.',
    4: 'Unified: a common map narrative drives consistent action.',
    5: 'Locked in: alignment is deep and decisions are frictionless.',
  },
};

const toScoreLabel = (score: number): string => {
  if (score >= 4.2) {
    return 'High';
  }
  if (score >= 3) {
    return 'Steady';
  }
  return 'Needs focus';
};

const buildRecommendations = (scores: PulseSnapshot): string[] => {
  const recommendations: string[] = [];

  if (scores.turbulence >= 4) {
    recommendations.push('Shorten planning cycles and review map signals weekly.');
  }
  if (scores.competitivePressure >= 4) {
    recommendations.push('Pressure-test counterplays and rehearse messaging for fast moves.');
  }
  if (scores.executionReadiness <= 3) {
    recommendations.push('Invest in capability gaps before committing to irreversible moves.');
  }
  if (scores.alignment <= 3) {
    recommendations.push('Run a leadership map review to reset shared intent.');
  }
  if (recommendations.length === 0) {
    recommendations.push('Keep the current cadence, but capture new signals every two weeks.');
  }

  return recommendations;
};

const formatDate = (value: string): string =>
  new Date(value).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

const isNumberInRange = (value: unknown): value is number =>
  typeof value === 'number' && Number.isFinite(value) && value >= 1 && value <= 5;

const isValidSnapshot = (value: unknown): value is PulseSnapshot => {
  if (!value || typeof value !== 'object') {
    return false;
  }
  const snapshot = value as PulseSnapshot;
  return (
    typeof snapshot.id === 'string' &&
    typeof snapshot.label === 'string' &&
    typeof snapshot.timestamp === 'string' &&
    isNumberInRange(snapshot.turbulence) &&
    isNumberInRange(snapshot.competitivePressure) &&
    isNumberInRange(snapshot.executionReadiness) &&
    isNumberInRange(snapshot.alignment)
  );
};

export default function StrategyPulseCheck(): ReactNode {
  const [turbulence, setTurbulence] = useState(3);
  const [competitivePressure, setCompetitivePressure] = useState(3);
  const [executionReadiness, setExecutionReadiness] = useState(3);
  const [alignment, setAlignment] = useState(3);
  const [label, setLabel] = useState('');
  const [snapshots, setSnapshots] = useState<PulseSnapshot[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return;
    }
    try {
      const parsed = JSON.parse(stored);
      if (!Array.isArray(parsed)) {
        setSnapshots([]);
        return;
      }
      const validSnapshots = parsed.filter(isValidSnapshot);
      setSnapshots(validSnapshots);
    } catch {
      setSnapshots([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshots));
  }, [snapshots]);

  const averageScore = useMemo(() => {
    const total = turbulence + competitivePressure + executionReadiness + alignment;
    return Number((total / 4).toFixed(1));
  }, [turbulence, competitivePressure, executionReadiness, alignment]);

  const scoreLabel = toScoreLabel(averageScore);

  const recommendations = useMemo(() => {
    return buildRecommendations({
      id: 'current',
      label: 'Current',
      timestamp: new Date().toISOString(),
      turbulence,
      competitivePressure,
      executionReadiness,
      alignment,
    });
  }, [turbulence, competitivePressure, executionReadiness, alignment]);

  const handleSave = () => {
    const snapshot: PulseSnapshot = {
      id: `${Date.now()}`,
      label: label.trim() || 'Untitled check-in',
      timestamp: new Date().toISOString(),
      turbulence,
      competitivePressure,
      executionReadiness,
      alignment,
    };

    setSnapshots((prev) => [snapshot, ...prev].slice(0, 10));
    setLabel('');
  };

  const handleLoad = (snapshot: PulseSnapshot) => {
    setTurbulence(snapshot.turbulence);
    setCompetitivePressure(snapshot.competitivePressure);
    setExecutionReadiness(snapshot.executionReadiness);
    setAlignment(snapshot.alignment);
  };

  const handleDelete = (snapshotId: string) => {
    setSnapshots((prev) => prev.filter((snapshot) => snapshot.id !== snapshotId));
  };

  return (
    <Layout
      title="Strategy Pulse Check"
      description="Track strategic turbulence, pressure, readiness, and alignment with a recurring pulse check."
    >
      <header className={styles.hero}>
        <div className="container">
          <div className={styles.heroContent}>
            <Heading as="h1" className={styles.heroTitle}>
              Strategy Pulse Check
            </Heading>
            <p className={styles.heroSubtitle}>
              A lightweight rhythm for leadership teams to monitor the strategic landscape, sense momentum, and decide
              when to accelerate or regroup. Save check-ins over time to spot trends in your map signals.
            </p>
            <span className={styles.insightPill}>Average score: {averageScore} · {scoreLabel}</span>
          </div>
        </div>
      </header>

      <main className="container margin-vert--lg">
        <section className={styles.section}>
          <div className="row">
            <div className="col col--7">
              <div className={styles.card}>
                <Heading as="h2">Tune the pulse</Heading>
                <p className={styles.note}>
                  Adjust each signal based on your latest map review. Use 1 (low) to 5 (high).
                </p>

                <div className={styles.sliderRow}>
                  <div className={styles.sliderHeader}>
                    <span>Turbulence</span>
                    <span className={styles.sliderValue}>{turbulence}</span>
                  </div>
                  <input
                    className={styles.sliderInput}
                    type="range"
                    min={1}
                    max={5}
                    value={turbulence}
                    onChange={(event) => setTurbulence(Number(event.target.value))}
                  />
                  <span className={styles.note}>{metricDescriptions.turbulence}</span>
                  <span className={styles.levelHint}>{levelDescriptions.turbulence[turbulence]}</span>
                </div>

                <div className={styles.sliderRow}>
                  <div className={styles.sliderHeader}>
                    <span>Competitive pressure</span>
                    <span className={styles.sliderValue}>{competitivePressure}</span>
                  </div>
                  <input
                    className={styles.sliderInput}
                    type="range"
                    min={1}
                    max={5}
                    value={competitivePressure}
                    onChange={(event) => setCompetitivePressure(Number(event.target.value))}
                  />
                  <span className={styles.note}>{metricDescriptions.competitivePressure}</span>
                  <span className={styles.levelHint}>
                    {levelDescriptions.competitivePressure[competitivePressure]}
                  </span>
                </div>

                <div className={styles.sliderRow}>
                  <div className={styles.sliderHeader}>
                    <span>Execution readiness</span>
                    <span className={styles.sliderValue}>{executionReadiness}</span>
                  </div>
                  <input
                    className={styles.sliderInput}
                    type="range"
                    min={1}
                    max={5}
                    value={executionReadiness}
                    onChange={(event) => setExecutionReadiness(Number(event.target.value))}
                  />
                  <span className={styles.note}>{metricDescriptions.executionReadiness}</span>
                  <span className={styles.levelHint}>
                    {levelDescriptions.executionReadiness[executionReadiness]}
                  </span>
                </div>

                <div className={styles.sliderRow}>
                  <div className={styles.sliderHeader}>
                    <span>Alignment</span>
                    <span className={styles.sliderValue}>{alignment}</span>
                  </div>
                  <input
                    className={styles.sliderInput}
                    type="range"
                    min={1}
                    max={5}
                    value={alignment}
                    onChange={(event) => setAlignment(Number(event.target.value))}
                  />
                  <span className={styles.note}>{metricDescriptions.alignment}</span>
                  <span className={styles.levelHint}>{levelDescriptions.alignment[alignment]}</span>
                </div>
              </div>
            </div>

            <div className="col col--5">
              <div className={clsx(styles.card, 'margin-bottom--lg')}>
                <Heading as="h2">What this means</Heading>
                <p className={styles.note}>
                  Use the interpretation below to choose the right tempo for your next strategic moves.
                </p>
                <p>
                  <strong>{scoreLabel} pulse.</strong> Average score {averageScore} suggests your current operating
                  rhythm should be{' '}
                  {averageScore >= 4
                    ? 'fast and experimental.'
                    : averageScore >= 3
                      ? 'steady with frequent sense-making.'
                      : 'focused on stabilising foundations.'}
                </p>
                <Heading as="h3">Recommended focus</Heading>
                <ul className={styles.recommendationList}>
                  {recommendations.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className="row">
            <div className="col col--12">
              <div className={styles.card}>
                <Heading as="h2">Save this check-in</Heading>
                <p className={styles.note}>
                  Capture a snapshot after each leadership review. Keep up to 10 recent check-ins.
                </p>
                <div className={styles.snapshotForm}>
                  <input
                    className={clsx('input input--lg', styles.snapshotInput)}
                    type="text"
                    placeholder="Label (e.g. Q3 map review)"
                    value={label}
                    onChange={(event) => setLabel(event.target.value)}
                  />
                  <button
                    className={clsx('button button--primary', styles.snapshotButton)}
                    type="button"
                    onClick={handleSave}
                  >
                    Save snapshot
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className="row">
            <div className="col col--12">
              <div className={styles.card}>
                <Heading as="h2">Recent snapshots</Heading>
                {snapshots.length === 0 ? (
                  <p className={styles.note}>
                    No snapshots yet. Save your first pulse check-in to start tracking trends.
                  </p>
                ) : (
                  <ul className={styles.snapshotList}>
                    {snapshots.map((snapshot) => (
                      <li key={snapshot.id} className={styles.snapshotItem}>
                        <div className={styles.snapshotMeta}>
                          <div>
                            <strong>{snapshot.label}</strong>
                            <div className={styles.note}>{formatDate(snapshot.timestamp)}</div>
                          </div>
                          <div className={styles.snapshotActions}>
                            <button
                              className="button button--secondary button--sm"
                              type="button"
                              onClick={() => handleLoad(snapshot)}
                            >
                              Load
                            </button>
                            <button
                              className="button button--outline button--secondary button--sm"
                              type="button"
                              onClick={() => handleDelete(snapshot.id)}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                        <div className={styles.snapshotDetails}>
                          Turbulence {snapshot.turbulence} · Competitive pressure {snapshot.competitivePressure} ·
                          Execution readiness {snapshot.executionReadiness} · Alignment {snapshot.alignment}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
