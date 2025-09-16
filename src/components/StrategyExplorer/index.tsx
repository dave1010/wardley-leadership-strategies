import React, {useMemo, useState} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import {usePluginData} from '@docusaurus/useGlobalData';
import type {
  StrategyMetadata,
  StrategyMetadataGlobalData,
} from '@site/src/types/strategyMetadata';
import styles from './styles.module.css';

type FilteredStrategy = {
  strategy: StrategyMetadata;
  score: number;
  matchingSkills: string[];
};

type FilterKind =
  | 'Category'
  | 'Evolution stage'
  | 'Strategic insight area'
  | 'Ethical alignment'
  | 'Leadership skill';

type ActiveFilterChip = {
  type: FilterKind;
  value: string;
  onRemove: () => void;
};

function normalizeLabel(value: string): string {
  return value
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function useSortedUnique(values: (string | undefined)[]): string[] {
  return useMemo(() => {
    return Array.from(
      new Set(values.filter((value): value is string => Boolean(value?.trim()))),
    ).sort((a, b) => a.localeCompare(b));
  }, [values]);
}

function FilterGroup({
  title,
  options,
  selected,
  onToggle,
  limit,
}: {
  title: string;
  options: string[];
  selected: Set<string>;
  onToggle: (value: string) => void;
  limit?: number;
}): JSX.Element {
  const [showAll, setShowAll] = useState(false);
  const visibleOptions = useMemo(() => {
    if (!limit || showAll || options.length <= limit) {
      return options;
    }
    return options.slice(0, limit);
  }, [limit, options, showAll]);

  const hasHiddenOptions = Boolean(limit) && options.length > (limit ?? 0);

  return (
    <section className={styles.filterSection}>
      <header className={styles.filterSectionHeader}>
        <Heading as="h3" className={styles.filterSectionTitle}>
          {title}
        </Heading>
        {hasHiddenOptions && (
          <button
            type="button"
            className={styles.showMoreButton}
            onClick={() => setShowAll((value) => !value)}>
            {showAll ? 'Show fewer' : `Show all ${options.length}`}
          </button>
        )}
      </header>
      <div className={styles.filterOptions}>
        {visibleOptions.map((option) => (
          <label key={option} className={styles.filterOption}>
            <input
              type="checkbox"
              checked={selected.has(option)}
              onChange={() => onToggle(option)}
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
    </section>
  );
}

function StrategyCard({
  item,
  selectedSkills,
}: {
  item: FilteredStrategy;
  selectedSkills: Set<string>;
}): JSX.Element {
  const {strategy, matchingSkills} = item;
  const humanCategory = normalizeLabel(strategy.category);
  const skills = strategy.leadershipSkills;
  const nonMatchingSkills = skills.filter((skill) => !selectedSkills.has(skill));

  return (
    <article className={clsx('card shadow--md', styles.strategyCard)}>
      <div className={styles.cardHeader}>
        <Heading as="h3" className={styles.cardTitle}>
          <Link to={strategy.permalink}>{strategy.title}</Link>
        </Heading>
        <span className={styles.categoryPill}>{humanCategory}</span>
      </div>
      {strategy.description && (
        <p className={styles.cardDescription}>{strategy.description}</p>
      )}
      <div className={styles.metaRow}>
        {strategy.evolutionStage && (
          <span className={styles.metaBadge}>
            Evolution: {strategy.evolutionStage}
          </span>
        )}
        {strategy.strategicInsightArea && (
          <span className={styles.metaBadge}>
            Insight: {strategy.strategicInsightArea}
          </span>
        )}
        {strategy.ethicalAlignment && (
          <span className={styles.metaBadge}>
            Ethics: {strategy.ethicalAlignment}
          </span>
        )}
      </div>
      {selectedSkills.size > 0 && (
        <p className={styles.matchSummary}>
          Matches {matchingSkills.length} of {selectedSkills.size} selected leadership skills
        </p>
      )}
      {skills.length > 0 && (
        <div className={styles.skillsList}>
          {matchingSkills.map((skill) => (
            <span key={`match-${skill}`} className={clsx(styles.skillChip, styles.skillChipActive)}>
              {skill}
            </span>
          ))}
          {nonMatchingSkills.map((skill) => (
            <span key={skill} className={styles.skillChip}>
              {skill}
            </span>
          ))}
        </div>
      )}
      <div className={styles.contextGrid}>
        {strategy.whenToUse && (
          <div className={styles.contextBlock}>
            <strong>Use when</strong>
            <p>{strategy.whenToUse}</p>
          </div>
        )}
        {strategy.whenToAvoid && (
          <div className={styles.contextBlock}>
            <strong>Avoid when</strong>
            <p>{strategy.whenToAvoid}</p>
          </div>
        )}
        {strategy.coreChallenge && (
          <div className={styles.contextBlock}>
            <strong>Core challenge</strong>
            <p>{strategy.coreChallenge}</p>
          </div>
        )}
      </div>
      <div className={styles.cardFooter}>
        <Link className="button button--primary button--sm" to={strategy.permalink}>
          Open strategy
        </Link>
        {strategy.tags.slice(0, 3).length > 0 && (
          <div className={styles.tagList}>
            {strategy.tags.slice(0, 3).map((tag) => (
              <span key={tag} className={styles.tagChip}>
                #{tag}
              </span>
            ))}
            {strategy.tags.length > 3 && <span className={styles.tagOverflow}>+{strategy.tags.length - 3}</span>}
          </div>
        )}
      </div>
    </article>
  );
}

export default function StrategyExplorer(): JSX.Element {
  const pluginData = usePluginData<StrategyMetadataGlobalData>('strategy-metadata-plugin');
  const strategies = pluginData?.strategies ?? [];

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedEvolutionStages, setSelectedEvolutionStages] = useState<string[]>([]);
  const [selectedInsightAreas, setSelectedInsightAreas] = useState<string[]>([]);
  const [selectedEthicalAlignment, setSelectedEthicalAlignment] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const categoryOptions = useMemo(
    () =>
      Array.from(new Set(strategies.map((strategy) => normalizeLabel(strategy.category)))).sort(
        (a, b) => a.localeCompare(b),
      ),
    [strategies],
  );
  const evolutionOptions = useSortedUnique(strategies.map((strategy) => strategy.evolutionStage));
  const insightOptions = useSortedUnique(
    strategies.map((strategy) => strategy.strategicInsightArea),
  );
  const ethicalOptions = useSortedUnique(
    strategies.map((strategy) => strategy.ethicalAlignment),
  );
  const skillOptions = useSortedUnique(
    strategies.flatMap((strategy) => strategy.leadershipSkills),
  );

  const selectedCategorySlugs = useMemo(
    () =>
      new Set(
        selectedCategories.map((label) =>
          label
            .toLowerCase()
            .split(' ')
            .join('-'),
        ),
      ),
    [selectedCategories],
  );

  const selectedEvolutionSet = useMemo(
    () => new Set(selectedEvolutionStages),
    [selectedEvolutionStages],
  );
  const selectedInsightSet = useMemo(
    () => new Set(selectedInsightAreas),
    [selectedInsightAreas],
  );
  const selectedEthicalSet = useMemo(
    () => new Set(selectedEthicalAlignment),
    [selectedEthicalAlignment],
  );
  const selectedSkillsSet = useMemo(() => new Set(selectedSkills), [selectedSkills]);

  const filteredStrategies = useMemo(() => {
    const search = searchQuery.trim().toLowerCase();
    return strategies
      .map<FilteredStrategy | null>((strategy) => {
        if (selectedCategorySlugs.size > 0 && !selectedCategorySlugs.has(strategy.category)) {
          return null;
        }
        if (
          selectedEvolutionSet.size > 0 &&
          (!strategy.evolutionStage || !selectedEvolutionSet.has(strategy.evolutionStage))
        ) {
          return null;
        }
        if (
          selectedInsightSet.size > 0 &&
          (!strategy.strategicInsightArea || !selectedInsightSet.has(strategy.strategicInsightArea))
        ) {
          return null;
        }
        if (
          selectedEthicalSet.size > 0 &&
          (!strategy.ethicalAlignment || !selectedEthicalSet.has(strategy.ethicalAlignment))
        ) {
          return null;
        }

        const matchingSkills = strategy.leadershipSkills.filter((skill) =>
          selectedSkillsSet.has(skill),
        );
        if (selectedSkillsSet.size > 0 && matchingSkills.length !== selectedSkillsSet.size) {
          return null;
        }

        const haystack = [
          strategy.title,
          strategy.description,
          strategy.whenToUse,
          strategy.whenToAvoid,
          strategy.coreChallenge,
          strategy.strategicInsightArea,
          strategy.evolutionStage,
          strategy.ethicalAlignment,
          strategy.category,
          ...strategy.tags,
          ...strategy.leadershipSkills,
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();
        if (search && !haystack.includes(search)) {
          return null;
        }

        let score = 0;
        if (search) {
          const title = strategy.title.toLowerCase();
          const description = strategy.description.toLowerCase();
          if (title.includes(search)) {
            score += 4;
          } else if (description.includes(search)) {
            score += 2;
          } else {
            score += 1;
          }
        }
        if (selectedCategorySlugs.size > 0) {
          score += 2;
        }
        if (selectedEvolutionSet.size > 0) {
          score += 2;
        }
        if (selectedInsightSet.size > 0) {
          score += 2;
        }
        if (selectedEthicalSet.size > 0) {
          score += 1;
        }
        score += matchingSkills.length * 2;

        return {strategy, score, matchingSkills};
      })
      .filter((item): item is FilteredStrategy => item !== null)
      .sort((a, b) => b.score - a.score || a.strategy.title.localeCompare(b.strategy.title));
  }, [
    strategies,
    searchQuery,
    selectedCategorySlugs,
    selectedEvolutionSet,
    selectedInsightSet,
    selectedEthicalSet,
    selectedSkillsSet,
  ]);

  const activeFilterChips: ActiveFilterChip[] = useMemo(() => {
    const chips: ActiveFilterChip[] = [];
    selectedCategories.forEach((value) =>
      chips.push({
        type: 'Category',
        value,
        onRemove: () =>
          setSelectedCategories((current) => current.filter((item) => item !== value)),
      }),
    );
    selectedEvolutionStages.forEach((value) =>
      chips.push({
        type: 'Evolution stage',
        value,
        onRemove: () =>
          setSelectedEvolutionStages((current) => current.filter((item) => item !== value)),
      }),
    );
    selectedInsightAreas.forEach((value) =>
      chips.push({
        type: 'Strategic insight area',
        value,
        onRemove: () =>
          setSelectedInsightAreas((current) => current.filter((item) => item !== value)),
      }),
    );
    selectedEthicalAlignment.forEach((value) =>
      chips.push({
        type: 'Ethical alignment',
        value,
        onRemove: () =>
          setSelectedEthicalAlignment((current) => current.filter((item) => item !== value)),
      }),
    );
    selectedSkills.forEach((value) =>
      chips.push({
        type: 'Leadership skill',
        value,
        onRemove: () => setSelectedSkills((current) => current.filter((item) => item !== value)),
      }),
    );
    return chips;
  }, [
    selectedCategories,
    selectedEvolutionStages,
    selectedInsightAreas,
    selectedEthicalAlignment,
    selectedSkills,
  ]);

  const activeFilterCount = activeFilterChips.length + (searchQuery.trim() ? 1 : 0);

  return (
    <div className={styles.layout}>
      <aside className={styles.filterPanel}>
        <div className={styles.searchGroup}>
          <label htmlFor="strategy-search" className={styles.searchLabel}>
            Search for scenarios, tags, or keywords
          </label>
          <input
            id="strategy-search"
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            className={styles.searchInput}
            placeholder="e.g. network effects, regulation, accelerate"
          />
        </div>
        <FilterGroup
          title="Category"
          options={categoryOptions}
          selected={new Set(selectedCategories)}
          onToggle={(value) =>
            setSelectedCategories((current) =>
              current.includes(value)
                ? current.filter((item) => item !== value)
                : [...current, value],
            )
          }
        />
        <FilterGroup
          title="Evolution stage"
          options={evolutionOptions}
          selected={selectedEvolutionSet}
          onToggle={(value) =>
            setSelectedEvolutionStages((current) =>
              current.includes(value)
                ? current.filter((item) => item !== value)
                : [...current, value],
            )
          }
        />
        <FilterGroup
          title="Strategic insight area"
          options={insightOptions}
          selected={selectedInsightSet}
          onToggle={(value) =>
            setSelectedInsightAreas((current) =>
              current.includes(value)
                ? current.filter((item) => item !== value)
                : [...current, value],
            )
          }
        />
        <FilterGroup
          title="Ethical alignment"
          options={ethicalOptions}
          selected={selectedEthicalSet}
          onToggle={(value) =>
            setSelectedEthicalAlignment((current) =>
              current.includes(value)
                ? current.filter((item) => item !== value)
                : [...current, value],
            )
          }
        />
        <FilterGroup
          title="Leadership skills"
          options={skillOptions}
          selected={selectedSkillsSet}
          onToggle={(value) =>
            setSelectedSkills((current) =>
              current.includes(value)
                ? current.filter((item) => item !== value)
                : [...current, value],
            )
          }
          limit={10}
        />
        <button
          type="button"
          className={styles.clearFiltersButton}
          onClick={() => {
            setSearchQuery('');
            setSelectedCategories([]);
            setSelectedEvolutionStages([]);
            setSelectedInsightAreas([]);
            setSelectedEthicalAlignment([]);
            setSelectedSkills([]);
          }}
          disabled={activeFilterCount === 0}>
          Clear all filters
        </button>
      </aside>
      <section className={styles.resultsSection}>
        <header className={styles.resultsHeader}>
          <div>
            <Heading as="h2" className={styles.resultsTitle}>
              {filteredStrategies.length} matching strategies
            </Heading>
            <p className={styles.resultsSubtitle}>
              Showing the best-fit Wardley plays out of {strategies.length} strategies in the library.
            </p>
          </div>
          {activeFilterCount > 0 && (
            <div className={styles.activeFiltersSummary}>
              Active filters ({activeFilterCount})
            </div>
          )}
        </header>
        {activeFilterChips.length > 0 && (
          <div className={styles.activeFilters}>
            {activeFilterChips.map((chip) => (
              <button
                key={`${chip.type}-${chip.value}`}
                type="button"
                className={styles.activeFilterChip}
                onClick={chip.onRemove}>
                <span className={styles.activeFilterChipLabel}>
                  {chip.type}: {chip.value}
                </span>
                <span aria-hidden="true">×</span>
              </button>
            ))}
          </div>
        )}
        {filteredStrategies.length === 0 ? (
          <div className={styles.noResults}>
            <Heading as="h3">No strategies match this combination yet</Heading>
            <p>
              Try removing a filter or broadening your search — the compendium includes plays for acceleration,
              defence, ecosystems, and user perception.
            </p>
          </div>
        ) : (
          <div className={styles.strategyList}>
            {filteredStrategies.map((item) => (
              <StrategyCard key={item.strategy.id} item={item} selectedSkills={selectedSkillsSet} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
