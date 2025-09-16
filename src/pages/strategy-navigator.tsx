import React, {useMemo, useState} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

import styles from './strategy-navigator.module.css';
import type {StrategyProfile} from '@site/src/data/strategyNavigator';
import {strategyProfiles} from '@site/src/data/strategyNavigator';

type ActiveFilter = {type: 'goal' | 'stage' | 'pressure'; value: string};

type StrategyMatch = StrategyProfile & {
  matchedGoals: string[];
  matchedStages: string[];
  matchedPressures: string[];
  matchScore: number;
  matchesSearch: boolean;
};

const uniqueSorted = (values: string[]): string[] =>
  Array.from(new Set(values)).sort((a, b) => a.localeCompare(b));

const getFitRating = (
  score: number,
  hasActiveFilters: boolean,
): {label: string; tone: 'neutral' | 'low' | 'medium' | 'high'} => {
  if (!hasActiveFilters) {
    return {label: 'Explore this play', tone: 'neutral'};
  }

  if (score >= 5) {
    return {label: 'High fit', tone: 'high'};
  }

  if (score >= 3) {
    return {label: 'Good fit', tone: 'medium'};
  }

  return {label: 'Contextual fit', tone: 'low'};
};

const comparisonRows: {label: string; render: (profile: StrategyProfile) => React.ReactNode}[] = [
  {
    label: 'Summary',
    render: (profile) => profile.summary,
  },
  {
    label: 'Goals it advances',
    render: (profile) => (
      <ul className={styles.comparisonList}>
        {profile.goals.map((goal) => (
          <li key={goal}>{goal}</li>
        ))}
      </ul>
    ),
  },
  {
    label: 'Landscape stage focus',
    render: (profile) => (
      <div className={styles.tagRow}>
        {profile.stages.map((stage) => (
          <span key={stage} className={styles.tag}>
            {stage}
          </span>
        ))}
      </div>
    ),
  },
  {
    label: 'Signals you may see',
    render: (profile) => (
      <ul className={styles.comparisonList}>
        {profile.quickSignals.map((signal) => (
          <li key={signal}>{signal}</li>
        ))}
      </ul>
    ),
  },
  {
    label: 'First momentum moves',
    render: (profile) => (
      <ul className={styles.comparisonList}>
        {profile.momentumMoves.map((move) => (
          <li key={move}>{move}</li>
        ))}
      </ul>
    ),
  },
  {
    label: 'Watch outs',
    render: (profile) => (
      <ul className={styles.comparisonList}>
        {profile.watchOuts.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    ),
  },
  {
    label: 'Leadership emphasis',
    render: (profile) => (
      <ul className={styles.comparisonList}>
        {profile.leadershipFocus.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    ),
  },
  {
    label: 'Effort profile',
    render: (profile) => profile.effortLevel,
  },
  {
    label: 'Time horizon',
    render: (profile) => profile.timeHorizon,
  },
];

const StrategyNavigator = (): JSX.Element => {
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [selectedStages, setSelectedStages] = useState<string[]>([]);
  const [selectedPressures, setSelectedPressures] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [comparison, setComparison] = useState<string[]>([]);

  const goalOptions = useMemo(
    () => uniqueSorted(strategyProfiles.flatMap((profile) => profile.goals)),
    [],
  );
  const stageOptions = useMemo(
    () => uniqueSorted(strategyProfiles.flatMap((profile) => profile.stages)),
    [],
  );
  const pressureOptions = useMemo(
    () => uniqueSorted(strategyProfiles.flatMap((profile) => profile.pressures)),
    [],
  );

  const hasActiveFilters =
    selectedGoals.length > 0 ||
    selectedStages.length > 0 ||
    selectedPressures.length > 0 ||
    searchTerm.trim().length > 0;

  const filteredStrategies = useMemo<StrategyMatch[]>(() => {
    const lowerSearch = searchTerm.trim().toLowerCase();

    return strategyProfiles
      .map((profile) => {
        const matchedGoals = profile.goals.filter((goal) =>
          selectedGoals.includes(goal),
        );
        const matchedStages = profile.stages.filter((stage) =>
          selectedStages.includes(stage),
        );
        const matchedPressures = profile.pressures.filter((pressure) =>
          selectedPressures.includes(pressure),
        );

        const searchCorpus = [
          profile.title,
          profile.summary,
          ...profile.goals,
          ...profile.stages,
          ...profile.pressures,
          ...profile.leadershipFocus,
          ...profile.quickSignals,
          ...profile.momentumMoves,
          ...profile.watchOuts,
        ]
          .join(' ')
          .toLowerCase();

        const matchesSearch = lowerSearch.length === 0 ||
          searchCorpus.includes(lowerSearch);

        const matchScore =
          matchedGoals.length * 2 +
          matchedStages.length +
          matchedPressures.length +
          (lowerSearch.length > 0 && matchesSearch ? 1 : 0);

        return {
          ...profile,
          matchedGoals,
          matchedStages,
          matchedPressures,
          matchesSearch,
          matchScore,
        };
      })
      .filter((profile) => {
        if (selectedGoals.length > 0 && profile.matchedGoals.length === 0) {
          return false;
        }
        if (selectedStages.length > 0 && profile.matchedStages.length === 0) {
          return false;
        }
        if (
          selectedPressures.length > 0 &&
          profile.matchedPressures.length === 0
        ) {
          return false;
        }
        if (lowerSearch.length > 0 && !profile.matchesSearch) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (b.matchScore !== a.matchScore) {
          return b.matchScore - a.matchScore;
        }
        return a.title.localeCompare(b.title);
      });
  }, [searchTerm, selectedGoals, selectedPressures, selectedStages]);

  const activeFilters = useMemo<ActiveFilter[]>(
    () => [
      ...selectedGoals.map((value) => ({type: 'goal', value} as ActiveFilter)),
      ...selectedStages.map((value) => ({type: 'stage', value} as ActiveFilter)),
      ...selectedPressures.map((value) => ({type: 'pressure', value} as ActiveFilter)),
    ],
    [selectedGoals, selectedPressures, selectedStages],
  );

  const toggleValue = (
    value: string,
    setState: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    setState((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value],
    );
  };

  const clearFilter = (filter: ActiveFilter) => {
    switch (filter.type) {
      case 'goal':
        setSelectedGoals((prev) => prev.filter((value) => value !== filter.value));
        break;
      case 'stage':
        setSelectedStages((prev) =>
          prev.filter((value) => value !== filter.value),
        );
        break;
      case 'pressure':
        setSelectedPressures((prev) =>
          prev.filter((value) => value !== filter.value),
        );
        break;
      default:
        break;
    }
  };

  const resetFilters = () => {
    setSelectedGoals([]);
    setSelectedStages([]);
    setSelectedPressures([]);
    setSearchTerm('');
  };

  const toggleComparison = (slug: string) => {
    setComparison((prev) => {
      if (prev.includes(slug)) {
        return prev.filter((item) => item !== slug);
      }
      if (prev.length >= 3) {
        return prev;
      }
      return [...prev, slug];
    });
  };

  const comparisonProfiles = useMemo(
    () =>
      comparison
        .map((slug) => strategyProfiles.find((profile) => profile.slug === slug))
        .filter((profile): profile is StrategyProfile => Boolean(profile)),
    [comparison],
  );

  return (
    <Layout
      title="Strategy Navigator"
      description="Filter Wardley Mapping leadership strategies by goals, landscape signals, and organisational pressure."
    >
      <section className={styles.hero}>
        <div className="container">
          <h1 className={styles.heroTitle}>Strategy Navigator</h1>
          <p className={styles.heroSubtitle}>
            Turn the signals from your Wardley Map into a curated short-list of leadership plays. Mix and match goals, landscape
            stages, and pressure points to surface strategies that fit your context.
          </p>
          <ul className={styles.heroChecklist}>
            <li>Start with the outcome you want to accelerate.</li>
            <li>Add the stage of evolution or the tension you feel.</li>
            <li>Review the suggested plays and compare the top contenders.</li>
          </ul>
        </div>
      </section>

      <section className={styles.filters} aria-labelledby="navigator-filters">
        <div className="container">
          <div className={styles.filterHeader}>
            <h2 id="navigator-filters">Tune the recommendation</h2>
            <button
              type="button"
              className={styles.resetButton}
              onClick={resetFilters}
              disabled={!hasActiveFilters}
            >
              Reset all filters
            </button>
          </div>

          <div className={styles.filterGrid}>
            <div className={styles.filterGroup}>
              <h3>Strategic goals</h3>
              <div className={styles.pillGroup}>
                {goalOptions.map((goal) => (
                  <button
                    key={goal}
                    type="button"
                    className={clsx(styles.pill, {
                      [styles.pillActive]: selectedGoals.includes(goal),
                    })}
                    onClick={() => toggleValue(goal, setSelectedGoals)}
                  >
                    {goal}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.filterGroup}>
              <h3>Landscape stage</h3>
              <div className={styles.pillGroup}>
                {stageOptions.map((stage) => (
                  <button
                    key={stage}
                    type="button"
                    className={clsx(styles.pill, {
                      [styles.pillActive]: selectedStages.includes(stage),
                    })}
                    onClick={() => toggleValue(stage, setSelectedStages)}
                  >
                    {stage}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.filterGroup}>
              <h3>Pressure points</h3>
              <div className={styles.pillGroup}>
                {pressureOptions.map((pressure) => (
                  <button
                    key={pressure}
                    type="button"
                    className={clsx(styles.pill, {
                      [styles.pillActive]: selectedPressures.includes(pressure),
                    })}
                    onClick={() => toggleValue(pressure, setSelectedPressures)}
                  >
                    {pressure}
                  </button>
                ))}
              </div>
            </div>

            <div className={clsx(styles.filterGroup, styles.searchGroup)}>
              <h3>Keyword search</h3>
              <input
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search by strategy name, signal, or capability"
                className={styles.searchInput}
                aria-label="Search strategies by keyword"
              />
            </div>
          </div>

          {activeFilters.length > 0 && (
            <div className={styles.activeFilters}>
              <span className={styles.activeFiltersLabel}>Active filters:</span>
              <div className={styles.activeFilterChips}>
                {activeFilters.map((filter) => (
                  <button
                    key={`${filter.type}-${filter.value}`}
                    type="button"
                    className={styles.activeFilter}
                    onClick={() => clearFilter(filter)}
                  >
                    {filter.value}
                    <span aria-hidden="true">×</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className={styles.resultsSection} aria-labelledby="navigator-results">
        <div className="container">
          <div className={styles.resultsHeader}>
            <div>
              <h2 id="navigator-results">Strategy recommendations</h2>
              <p className={styles.resultsSummary}>
                Showing {filteredStrategies.length} of {strategyProfiles.length} plays
                {hasActiveFilters ? ' that match your filters.' : '.'}
              </p>
            </div>
            {comparison.length > 0 && (
              <div className={styles.comparisonCounter}>
                {comparison.length} selected for comparison (max 3)
              </div>
            )}
          </div>

          {filteredStrategies.length === 0 ? (
            <div className={styles.emptyState}>
              <h3>No strategies found</h3>
              <p>
                Try removing a filter or broadening your search. Leadership plays often work in combinations—explore adjacent goals
                or stages.
              </p>
            </div>
          ) : (
            <div className={styles.cardGrid}>
              {filteredStrategies.map((strategy) => {
                const fit = getFitRating(strategy.matchScore, hasActiveFilters);
                const inComparison = comparison.includes(strategy.slug);

                return (
                  <article key={strategy.slug} className={styles.card}>
                    <div className={styles.cardHeader}>
                      <div>
                        <h3 className={styles.cardTitle}>{strategy.title}</h3>
                        <p className={styles.cardSummary}>{strategy.summary}</p>
                      </div>
                      <span
                        className={clsx(styles.fitBadge, {
                          [styles.fitHigh]: fit.tone === 'high',
                          [styles.fitMedium]: fit.tone === 'medium',
                          [styles.fitLow]: fit.tone === 'low',
                          [styles.fitNeutral]: fit.tone === 'neutral',
                        })}
                      >
                        {fit.label}
                      </span>
                    </div>

                    <div className={styles.cardMeta}>
                      <div>
                        <h4>Goals it supports</h4>
                        <div className={styles.tagRow}>
                          {strategy.goals.map((goal) => (
                            <span
                              key={goal}
                              className={clsx(styles.tag, {
                                [styles.tagActive]: strategy.matchedGoals.includes(goal),
                              })}
                            >
                              {goal}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4>Landscape feels like</h4>
                        <div className={styles.tagRow}>
                          {strategy.pressures.map((pressure) => (
                            <span
                              key={pressure}
                              className={clsx(styles.tag, {
                                [styles.tagActive]: strategy.matchedPressures.includes(pressure),
                              })}
                            >
                              {pressure}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className={styles.cardBody}>
                      <div className={styles.cardListGroup}>
                        <h4>Signals to watch for</h4>
                        <ul className={styles.cardList}>
                          {strategy.quickSignals.map((signal) => (
                            <li key={signal}>{signal}</li>
                          ))}
                        </ul>
                      </div>
                      <div className={styles.cardListGroup}>
                        <h4>First momentum moves</h4>
                        <ul className={styles.cardList}>
                          {strategy.momentumMoves.map((move) => (
                            <li key={move}>{move}</li>
                          ))}
                        </ul>
                      </div>
                      <div className={styles.cardListGroup}>
                        <h4>Watch outs</h4>
                        <ul className={styles.cardList}>
                          {strategy.watchOuts.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className={styles.cardFooter}>
                      <div className={styles.cardFooterMeta}>
                        <span>Effort: {strategy.effortLevel}</span>
                        <span>Time horizon: {strategy.timeHorizon}</span>
                      </div>
                      <div className={styles.cardActions}>
                        <Link className="button button--primary button--sm" to={strategy.slug}>
                          Read the full play
                        </Link>
                        <button
                          type="button"
                          className={clsx('button button--secondary button--sm', {
                            [styles.compareActive]: inComparison,
                          })}
                          onClick={() => toggleComparison(strategy.slug)}
                          disabled={!inComparison && comparison.length >= 3}
                        >
                          {inComparison ? 'Remove from comparison' : 'Add to comparison'}
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {comparisonProfiles.length > 0 && (
        <section className={styles.comparisonSection} aria-labelledby="strategy-comparison">
          <div className="container">
            <div className={styles.comparisonHeader}>
              <div>
                <h2 id="strategy-comparison">Compare selected plays</h2>
                <p>
                  Line up the plays side by side to weigh leadership focus, signals, and effort. Remove a card to add another one.
                </p>
              </div>
              <button type="button" className={styles.resetButton} onClick={() => setComparison([])}>
                Clear comparison
              </button>
            </div>

            <div className={styles.comparisonTable} role="table" aria-label="Strategy comparison table">
              <div
                className={styles.comparisonGrid}
                style={{
                  gridTemplateColumns: `200px repeat(${comparisonProfiles.length}, minmax(220px, 1fr))`,
                }}
              >
                <div className={clsx(styles.comparisonCell, styles.comparisonHeading)} role="columnheader">
                  Strategy
                </div>
                {comparisonProfiles.map((profile) => (
                  <div
                    key={profile.slug}
                    className={clsx(styles.comparisonCell, styles.comparisonHeading)}
                    role="columnheader"
                  >
                    <div className={styles.comparisonHeadingInner}>
                      <Link to={profile.slug}>{profile.title}</Link>
                      <button
                        type="button"
                        className={styles.removeComparison}
                        onClick={() => toggleComparison(profile.slug)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}

                {comparisonRows.map((row) => (
                  <React.Fragment key={row.label}>
                    <div className={clsx(styles.comparisonCell, styles.comparisonLabel)} role="rowheader">
                      {row.label}
                    </div>
                    {comparisonProfiles.map((profile) => (
                      <div key={`${row.label}-${profile.slug}`} className={styles.comparisonCell} role="cell">
                        {row.render(profile)}
                      </div>
                    ))}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default StrategyNavigator;
