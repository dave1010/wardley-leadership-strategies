import {
  clearAllAssessments,
  clearSectionState,
  clearStrategy,
  getAllSummaries,
  loadSectionState,
  removeSummary,
  saveSectionState,
  saveSummary,
} from './assessmentStorage';
import { AssessmentSummary, TrafficLight } from '@site/src/components/Assessment/types';
import { beforeEach, describe, it } from '@jest/globals';

describe('assessmentStorage', () => {
  const strategyId = '/strategies/example';

  beforeEach(() => {
    window.localStorage.clear();
  });

  it('saves and loads section state', () => {
    const values: TrafficLight[] = ['green', 'amber', 'red'];
    saveSectionState(strategyId, 'map', values);
    const stored = loadSectionState(strategyId, 'map');
    expect(stored).not.toBeNull();
    expect(stored?.values).toEqual(values);
    expect(new Date(stored!.updatedAt).getTime()).not.toBeNaN();

    clearSectionState(strategyId, 'map');
    expect(loadSectionState(strategyId, 'map')).toBeNull();
  });

  it('stores summaries and supports removal', () => {
    const summary: AssessmentSummary = {
      id: strategyId,
      strategyName: 'Example strategy',
      strategyTitle: 'Example strategy',
      permalink: strategyId,
      mapScore: 80,
      readinessScore: 70,
      mapLevel: 'Strong',
      readinessLevel: 'Strong',
      recommendation: 'Proceed with confidence.',
      updatedAt: new Date('2024-01-01').toISOString(),
    };

    saveSummary(summary);

    const all = getAllSummaries();
    expect(all).toHaveLength(1);
    expect(all[0]).toMatchObject(summary);

    removeSummary(strategyId);
    expect(getAllSummaries()).toHaveLength(0);
  });

  it('clears all persisted data for a strategy', () => {
    saveSectionState(strategyId, 'map', ['green']);
    saveSectionState(strategyId, 'readiness', ['amber']);
    saveSummary({
      id: strategyId,
      strategyName: 'Example',
      mapScore: 60,
      readinessScore: 40,
      mapLevel: 'Strong',
      readinessLevel: 'Weak',
      recommendation: 'Work to improve readiness.',
      updatedAt: new Date().toISOString(),
    } as AssessmentSummary);

    clearStrategy(strategyId);
    expect(loadSectionState(strategyId, 'map')).toBeNull();
    expect(loadSectionState(strategyId, 'readiness')).toBeNull();
    expect(getAllSummaries()).toHaveLength(0);
  });

  it('clears all assessments at once', () => {
    saveSummary({
      id: strategyId,
      strategyName: 'Example',
      mapScore: 50,
      readinessScore: 50,
      mapLevel: 'Weak',
      readinessLevel: 'Weak',
      recommendation: 'Reassess.',
      updatedAt: new Date().toISOString(),
    } as AssessmentSummary);
    saveSummary({
      id: '/strategies/second',
      strategyName: 'Second',
      mapScore: 70,
      readinessScore: 80,
      mapLevel: 'Strong',
      readinessLevel: 'Strong',
      recommendation: 'Proceed.',
      updatedAt: new Date().toISOString(),
    } as AssessmentSummary);

    expect(getAllSummaries()).toHaveLength(2);
    clearAllAssessments();
    expect(getAllSummaries()).toHaveLength(0);
  });
});
