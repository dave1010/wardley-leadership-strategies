import React, {type ReactNode} from 'react';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import clsx from 'clsx';

import styles from './styles.module.css';

type StrategyFrontMatter = {
  goals?: unknown;
  stages?: unknown;
  evolution_stage?: unknown;
  effort_level?: unknown;
  time_horizon?: unknown;
  leadership_focus?: unknown;
};

type StrategyMetadataItem = {
  label: string;
  value: string;
};

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function asStringArray(value: unknown): string[] | undefined {
  if (!value) {
    return undefined;
  }

  if (Array.isArray(value)) {
    const cleaned = value
      .map((item) => (typeof item === 'string' ? item.trim() : ''))
      .filter((item) => item.length > 0);

    return cleaned.length > 0 ? cleaned : undefined;
  }

  if (typeof value === 'string' && value.trim().length > 0) {
    return [value.trim()];
  }

  return undefined;
}

function shouldRenderForStrategy(permalink?: string): boolean {
  return typeof permalink === 'string' && permalink.startsWith('/strategies/');
}

function buildOverviewItems(frontMatter: StrategyFrontMatter): StrategyMetadataItem[] {
  const items: StrategyMetadataItem[] = [];

  if (isNonEmptyString(frontMatter.effort_level)) {
    items.push({label: 'Effort level', value: frontMatter.effort_level.trim()});
  }

  if (isNonEmptyString(frontMatter.time_horizon)) {
    items.push({label: 'Time horizon', value: frontMatter.time_horizon.trim()});
  }

  const stages = asStringArray(frontMatter.stages) ?? asStringArray(frontMatter.evolution_stage);
  if (stages && stages.length > 0) {
    items.push({label: 'Evolution focus', value: stages.join(' • ')});
  }

  return items;
}

export function StrategyAtAGlance(): ReactNode {
  const {metadata, frontMatter} = useDoc();
  if (!shouldRenderForStrategy(metadata.permalink)) {
    return null;
  }

  const strategyFrontMatter = frontMatter as StrategyFrontMatter;
  const goals = asStringArray(strategyFrontMatter.goals);
  const items = buildOverviewItems(strategyFrontMatter);

  if ((!goals || goals.length === 0) && items.length === 0) {
    return null;
  }

  return (
    <div className={styles.overviewCard}>
      {goals && goals.length > 0 && (
        <div className={styles.goalsSection}>
          <p className={styles.sectionLabel}>Goals it supports</p>
          <div className={styles.pillGroup}>
            {goals.map((goal) => (
              <span key={goal} className={styles.pill}>
                {goal}
              </span>
            ))}
          </div>
        </div>
      )}

      {items.length > 0 && (
        <div className={clsx(styles.metaGrid, {[styles.metaGridCompact]: !goals || goals.length === 0})}>
          {items.map((item) => (
            <div key={item.label} className={styles.metaItem}>
              <span className={styles.metaLabel}>{item.label}</span>
              <span className={styles.metaValue}>{item.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function LeadershipFocusPills(): ReactNode {
  const {metadata, frontMatter} = useDoc();
  if (!shouldRenderForStrategy(metadata.permalink)) {
    return null;
  }

  const strategyFrontMatter = frontMatter as StrategyFrontMatter;
  const leadershipFocus = asStringArray(strategyFrontMatter.leadership_focus);

  if (!leadershipFocus || leadershipFocus.length === 0) {
    return null;
  }

  return (
    <div className={styles.leadershipContainer}>
      <span className={styles.sectionLabel}>Leadership emphasis</span>
      <div className={styles.pillGroup}>
        {leadershipFocus.map((focus) => (
          <span key={focus} className={styles.pill}>
            {focus}
          </span>
        ))}
      </div>
    </div>
  );
}
