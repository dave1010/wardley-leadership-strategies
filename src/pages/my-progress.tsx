import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import {
  clearAllAssessments,
  clearStrategy,
  getAllSummaries,
  isStorageAvailable,
} from '@site/src/utils/assessmentStorage';
import { AssessmentSummary } from '@site/src/components/Assessment/types';
import styles from './my-progress.module.css';

const formatDateTime = (value: string): string => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return date.toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
};

const getStatusBadge = (
  summary: AssessmentSummary,
): {label: string; className: string} => {
  if (summary.mapLevel === 'Strong' && summary.readinessLevel === 'Strong') {
    return {label: 'Ready to Execute', className: 'badge--success'};
  }
  if (summary.mapLevel === 'Strong' || summary.readinessLevel === 'Strong') {
    return {label: 'Needs Preparation', className: 'badge--warning'};
  }
  return {label: 'Reassess Strategy', className: 'badge--danger'};
};

const ScoreBadge = ({label, score}: {label: string; score: number}) => (
  <div className={styles.scoreCell}>
    <span className={clsx('badge', label === 'Strong' ? 'badge--success' : 'badge--secondary')}>
      {label}
    </span>
    <span className={styles.scoreValue}>{score}</span>
  </div>
);

export default function MyProgressPage(): JSX.Element {
  const [summaries, setSummaries] = useState<AssessmentSummary[]>([]);
  const [storageReady, setStorageReady] = useState(false);

  const refresh = useCallback(() => {
    if (isStorageAvailable()) {
      setSummaries(getAllSummaries());
      setStorageReady(true);
    } else {
      setStorageReady(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const emptyState = storageReady && summaries.length === 0;

  const handleClearAll = () => {
    clearAllAssessments();
    refresh();
  };

  const handleRemove = (id: string) => {
    clearStrategy(id);
    refresh();
  };

  const totalStrong = useMemo(
    () => summaries.filter((summary) => summary.mapLevel === 'Strong' && summary.readinessLevel === 'Strong').length,
    [summaries],
  );

  return (
    <Layout title="My Strategy Assessments" description="Review and manage your saved Wardley strategy assessments.">
      <main className="container margin-vert--lg">
        <header className="margin-bottom--lg">
          <h1 className="margin-bottom--sm">My Strategy Assessments</h1>
          <p className="margin-bottom--md">
            Save time by continuing exactly where you left off. Your traffic-light selections from each strategy assessment are
            stored in your browser so you can revisit, compare, and refine your plans across Wardley strategies.
          </p>
          <div className={styles.headerActions}>
            <Link className="button button--primary" to="/strategies">
              Explore strategies
            </Link>
            <button
              type="button"
              className="button button--secondary"
              onClick={handleClearAll}
              disabled={!storageReady || summaries.length === 0}
            >
              Clear saved assessments
            </button>
          </div>
        </header>

        {!storageReady && (
          <div className="alert alert--warning" role="alert">
            Local storage is disabled in this environment, so assessment progress cannot be stored. Enable cookies/local storage
            and revisit this page after completing an assessment.
          </div>
        )}

        {emptyState && (
          <div className={clsx('card', 'card--full-width', styles.emptyState)}>
            <div className="card__body">
              <h2>No assessments saved yet</h2>
              <p>
                Open any strategy page, work through the self-assessment tool, and your answers will appear here automatically for
                future reference.
              </p>
              <Link className="button button--primary" to="/strategies">
                Start exploring strategies
              </Link>
            </div>
          </div>
        )}

        {storageReady && summaries.length > 0 && (
          <>
            <section className={clsx('margin-bottom--lg', styles.summaryPanel)}>
              <div className="card">
                <div className="card__body">
                  <strong>{summaries.length}</strong> strategies assessed ·{' '}
                  <strong>{totalStrong}</strong> ready to execute now
                </div>
              </div>
            </section>

            <div className="table-responsive">
              <table className={clsx('table', styles.table)}>
                <thead>
                  <tr>
                    <th scope="col">Strategy</th>
                    <th scope="col">Strategic Fit</th>
                    <th scope="col">Ability to Execute</th>
                    <th scope="col">Recommendation</th>
                    <th scope="col">Last Updated</th>
                    <th scope="col" className="text--right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {summaries.map((summary) => {
                    const badge = getStatusBadge(summary);
                    return (
                      <tr key={summary.id}>
                        <td>
                          {summary.permalink ? (
                            <Link to={summary.permalink}>
                              {summary.strategyTitle ?? summary.strategyName}
                            </Link>
                          ) : (
                            <span>{summary.strategyTitle ?? summary.strategyName}</span>
                          )}
                          {summary.strategyTitle && summary.strategyTitle !== summary.strategyName && (
                            <div className={styles.secondaryName}>{summary.strategyName}</div>
                          )}
                        </td>
                        <td>
                          <ScoreBadge label={summary.mapLevel} score={summary.mapScore} />
                        </td>
                        <td>
                          <ScoreBadge label={summary.readinessLevel} score={summary.readinessScore} />
                        </td>
                        <td>
                          <div className={styles.recommendationCell}>
                            <span className={clsx('badge', badge.className)}>{badge.label}</span>
                            <span className={styles.recommendationText}>{summary.recommendation}</span>
                          </div>
                        </td>
                        <td>{formatDateTime(summary.updatedAt)}</td>
                        <td className={clsx(styles.actionCell, 'text--right')}>
                          {summary.permalink && (
                            <Link className="button button--sm button--secondary" to={summary.permalink}>
                              View strategy
                            </Link>
                          )}
                          <button
                            type="button"
                            className="button button--sm button--danger"
                            onClick={() => handleRemove(summary.id)}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
      </main>
    </Layout>
  );
}
