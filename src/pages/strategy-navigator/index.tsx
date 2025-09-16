import React, {useMemo, useState} from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import strategies, {StrategyMetadata} from '@site/src/data/strategyIndex';
import styles from './styles.module.css';

type SignalOption = {
  text: string;
  count: number;
};

function buildSignalOptions(
  data: StrategyMetadata[],
  key: 'mapSignals' | 'readiness',
): SignalOption[] {
  const counts = new Map<string, number>();
  data.forEach((strategy) => {
    strategy[key].forEach((statement) => {
      const trimmed = statement.trim();
      if (!trimmed) {
        return;
      }
      counts.set(trimmed, (counts.get(trimmed) ?? 0) + 1);
    });
  });

  return Array.from(counts.entries())
    .map(([text, count]) => ({text, count}))
    .sort((a, b) => {
      if (b.count === a.count) {
        return a.text.localeCompare(b.text);
      }
      return b.count - a.count;
    });
}

function useSignalSuggestions(
  options: SignalOption[],
  selected: string[],
  search: string,
): SignalOption[] {
  const lowerSearch = search.trim().toLowerCase();
  return useMemo(() => {
    return options
      .filter((option) => !selected.includes(option.text))
      .filter((option) =>
        lowerSearch ? option.text.toLowerCase().includes(lowerSearch) : true,
      )
      .slice(0, 8);
  }, [lowerSearch, options, selected]);
}

function normaliseCategory(category: string): string {
  return category.replace(/-/g, ' ');
}

type Result = {
  strategy: StrategyMetadata;
  mapMatches: string[];
  readinessMatches: string[];
  score: number;
};

type ResultRow = Result & {
  matchesSearch: boolean;
  matchesCategory: boolean;
  matchesSignals: boolean;
};

export default function StrategyNavigatorPage(): JSX.Element {
  const categories = useMemo(() => {
    return Array.from(new Set(strategies.map((item) => item.category))).sort((a, b) =>
      a.localeCompare(b),
    );
  }, []);

  const mapOptions = useMemo(() => buildSignalOptions(strategies, 'mapSignals'), []);
  const readinessOptions = useMemo(
    () => buildSignalOptions(strategies, 'readiness'),
    [],
  );

  const [selectedMapSignals, setSelectedMapSignals] = useState<string[]>([]);
  const [selectedReadinessSignals, setSelectedReadinessSignals] = useState<string[]>([]);
  const [mapSearch, setMapSearch] = useState('');
  const [readinessSearch, setReadinessSearch] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const mapSuggestions = useSignalSuggestions(
    mapOptions,
    selectedMapSignals,
    mapSearch,
  );
  const readinessSuggestions = useSignalSuggestions(
    readinessOptions,
    selectedReadinessSignals,
    readinessSearch,
  );

  const addMapSignal = (signal: string) => {
    setSelectedMapSignals((current) =>
      current.includes(signal) ? current : [...current, signal],
    );
    setMapSearch('');
  };

  const addReadinessSignal = (signal: string) => {
    setSelectedReadinessSignals((current) =>
      current.includes(signal) ? current : [...current, signal],
    );
    setReadinessSearch('');
  };

  const removeMapSignal = (signal: string) => {
    setSelectedMapSignals((current) => current.filter((item) => item !== signal));
  };

  const removeReadinessSignal = (signal: string) => {
    setSelectedReadinessSignals((current) =>
      current.filter((item) => item !== signal),
    );
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories((current) =>
      current.includes(category)
        ? current.filter((item) => item !== category)
        : [...current, category],
    );
  };

  const clearSignals = () => {
    setSelectedMapSignals([]);
    setSelectedReadinessSignals([]);
  };

  const lowerSearchTerm = searchTerm.trim().toLowerCase();
  const hasSignalFilters =
    selectedMapSignals.length > 0 || selectedReadinessSignals.length > 0;
  const selectedCategorySet = useMemo(
    () => new Set(selectedCategories),
    [selectedCategories],
  );

  const results = useMemo(() => {
    return strategies
      .map<ResultRow>((strategy) => {
        const mapMatches = strategy.mapSignals.filter((signal) =>
          selectedMapSignals.includes(signal),
        );
        const readinessMatches = strategy.readiness.filter((signal) =>
          selectedReadinessSignals.includes(signal),
        );
        const searchHaystack = [
          strategy.title,
          strategy.description,
          strategy.category,
          ...strategy.tags,
          ...strategy.mapSignals,
          ...strategy.readiness,
        ]
          .join(' ')
          .toLowerCase();
        const matchesSearch = lowerSearchTerm
          ? searchHaystack.includes(lowerSearchTerm)
          : true;
        const matchesCategory =
          selectedCategorySet.size === 0 || selectedCategorySet.has(strategy.category);
        const matchesSignals =
          !hasSignalFilters || mapMatches.length + readinessMatches.length > 0;
        const score = mapMatches.length * 3 + readinessMatches.length * 2;
        return {
          strategy,
          mapMatches,
          readinessMatches,
          score,
          matchesSearch,
          matchesCategory,
          matchesSignals,
        } satisfies ResultRow;
      })
      .filter(
        (entry) => entry.matchesSearch && entry.matchesCategory && entry.matchesSignals,
      )
      .sort((a, b) => {
        if (hasSignalFilters) {
          if (b.score !== a.score) {
            return b.score - a.score;
          }
          if (b.mapMatches.length !== a.mapMatches.length) {
            return b.mapMatches.length - a.mapMatches.length;
          }
          if (b.readinessMatches.length !== a.readinessMatches.length) {
            return b.readinessMatches.length - a.readinessMatches.length;
          }
        }
        return a.strategy.title.localeCompare(b.strategy.title);
      });
  }, [
    hasSignalFilters,
    lowerSearchTerm,
    selectedCategorySet,
    selectedMapSignals,
    selectedReadinessSignals,
  ]);

  return (
    <Layout
      title="Strategy Navigator"
      description="Filter Wardley strategies by the signals you see on your map and the doctrine you have in place."
    >
      <main className={styles.page}>
        <header className={styles.hero}>
          <h1>Strategy Navigator</h1>
          <p>
            Choose the context you see on your map and the doctrine your organisation has
            mastered. The navigator ranks Wardley strategies that best align with your
            situation and highlights the signals they expect to see.
          </p>
          {hasSignalFilters ? (
            <button type="button" className="button button--sm button--secondary" onClick={clearSignals}>
              Clear selected signals
            </button>
          ) : null}
        </header>

        <section className={styles.filtersSection}>
          <div className={styles.filterGrid}>
            <div className={styles.filterCard}>
              <h2>Landscape signals</h2>
              <p className={styles.filterIntro}>
                Add statements that describe what you see on the map. We’ll match strategies that
                reference the same signals.
              </p>
              <input
                type="text"
                className={styles.searchInput}
                value={mapSearch}
                onChange={(event) => setMapSearch(event.target.value)}
                placeholder="Search landscape signals"
              />
              <div className={styles.chipList}>
                {selectedMapSignals.map((signal) => (
                  <span key={signal} className={styles.chip}>
                    {signal}
                    <button
                      type="button"
                      aria-label={`Remove ${signal}`}
                      onClick={() => removeMapSignal(signal)}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <div className={styles.suggestionList}>
                {mapSuggestions.length === 0 ? (
                  <p className={styles.emptyState}>No matching signals yet.</p>
                ) : (
                  mapSuggestions.map((option) => (
                    <button
                      key={option.text}
                      type="button"
                      className={styles.suggestionButton}
                      onClick={() => addMapSignal(option.text)}
                    >
                      <span>{option.text}</span>
                      <span className={styles.suggestionCount}>{option.count}</span>
                    </button>
                  ))
                )}
              </div>
            </div>

            <div className={styles.filterCard}>
              <h2>Doctrine readiness</h2>
              <p className={styles.filterIntro}>
                Add doctrine statements your organisation satisfies. Matching strategies surface when
                their readiness list aligns with your strengths.
              </p>
              <input
                type="text"
                className={styles.searchInput}
                value={readinessSearch}
                onChange={(event) => setReadinessSearch(event.target.value)}
                placeholder="Search doctrine readiness"
              />
              <div className={styles.chipList}>
                {selectedReadinessSignals.map((signal) => (
                  <span key={signal} className={styles.chip}>
                    {signal}
                    <button
                      type="button"
                      aria-label={`Remove ${signal}`}
                      onClick={() => removeReadinessSignal(signal)}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <div className={styles.suggestionList}>
                {readinessSuggestions.length === 0 ? (
                  <p className={styles.emptyState}>No matching readiness signals yet.</p>
                ) : (
                  readinessSuggestions.map((option) => (
                    <button
                      key={option.text}
                      type="button"
                      className={styles.suggestionButton}
                      onClick={() => addReadinessSignal(option.text)}
                    >
                      <span>{option.text}</span>
                      <span className={styles.suggestionCount}>{option.count}</span>
                    </button>
                  ))
                )}
              </div>
            </div>

            <div className={styles.filterCard}>
              <h2>Refine the results</h2>
              <p className={styles.filterIntro}>
                Combine text search with category filters to drill into specific areas of play.
              </p>
              <input
                type="text"
                className={styles.searchInput}
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search titles, tags and descriptions"
              />
              <div className={styles.categoryList}>
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    className={clsx(styles.categoryButton, {
                      [styles.categoryButtonActive]: selectedCategories.includes(category),
                    })}
                    onClick={() => toggleCategory(category)}
                  >
                    {normaliseCategory(category)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className={styles.resultsSection}>
          <div className={styles.resultsHeader}>
            <h2>Recommended strategies</h2>
            <p>
              {results.length} strategy{results.length === 1 ? '' : 'ies'} match your current filters.
              Strategies with more matching signals rise to the top.
            </p>
          </div>
          {results.length === 0 ? (
            <div className={styles.emptyResults}>
              <p>No strategies match all of your selections yet.</p>
              <p>Try removing a filter or broadening your search terms.</p>
            </div>
          ) : (
            <div className={styles.strategyGrid}>
              {results.map(({strategy, mapMatches, readinessMatches, score}) => {
                const remainingMapSignals = strategy.mapSignals
                  .filter((signal) => !mapMatches.includes(signal))
                  .slice(0, 3);
                const remainingReadiness = strategy.readiness
                  .filter((signal) => !readinessMatches.includes(signal))
                  .slice(0, 3);
                return (
                  <article key={strategy.id} className={styles.strategyCard}>
                    <header className={styles.strategyHeader}>
                      <div>
                        <Link to={strategy.permalink} className={styles.strategyTitle}>
                          {strategy.title}
                        </Link>
                        <span className={styles.categoryBadge}>
                          {normaliseCategory(strategy.category)}
                        </span>
                      </div>
                      {hasSignalFilters ? (
                        <div className={styles.scoreBadge}>
                          <span className={styles.scoreValue}>{score}</span>
                          <span className={styles.scoreLabel}>fit score</span>
                        </div>
                      ) : null}
                    </header>
                    <p className={styles.strategyDescription}>{strategy.description}</p>
                    <div className={styles.tagList}>
                      {strategy.tags.slice(0, 6).map((tag) => (
                        <span key={tag} className={styles.tag}>
                          {tag}
                        </span>
                      ))}
                    </div>

                    {mapMatches.length > 0 ? (
                      <div className={styles.matchBlock}>
                        <h3>Landscape match</h3>
                        <ul>
                          {mapMatches.map((signal) => (
                            <li key={signal}>{signal}</li>
                          ))}
                        </ul>
                      </div>
                    ) : null}

                    {readinessMatches.length > 0 ? (
                      <div className={styles.matchBlock}>
                        <h3>Doctrine match</h3>
                        <ul>
                          {readinessMatches.map((signal) => (
                            <li key={signal}>{signal}</li>
                          ))}
                        </ul>
                      </div>
                    ) : null}

                    {(remainingMapSignals.length > 0 || remainingReadiness.length > 0) && (
                      <div className={styles.remainingSignals}>
                        {remainingMapSignals.length > 0 ? (
                          <div>
                            <span className={styles.remainingLabel}>Also looks for</span>
                            <div className={styles.remainingChips}>
                              {remainingMapSignals.map((signal) => (
                                <button
                                  key={signal}
                                  type="button"
                                  onClick={() => addMapSignal(signal)}
                                >
                                  {signal}
                                </button>
                              ))}
                            </div>
                          </div>
                        ) : null}
                        {remainingReadiness.length > 0 ? (
                          <div>
                            <span className={styles.remainingLabel}>Needs readiness such as</span>
                            <div className={styles.remainingChips}>
                              {remainingReadiness.map((signal) => (
                                <button
                                  key={signal}
                                  type="button"
                                  onClick={() => addReadinessSignal(signal)}
                                >
                                  {signal}
                                </button>
                              ))}
                            </div>
                          </div>
                        ) : null}
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </Layout>
  );
}
