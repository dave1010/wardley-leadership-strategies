export type TrafficLight = 'green' | 'amber' | 'red';

export type AssessmentSection = 'map' | 'readiness';

export type StoredSectionState = {
  values: TrafficLight[];
  updatedAt: string;
};

export type AssessmentSummary = {
  id: string;
  strategyName: string;
  strategyTitle?: string;
  permalink?: string;
  mapScore: number;
  readinessScore: number;
  mapLevel: 'Strong' | 'Weak';
  readinessLevel: 'Strong' | 'Weak';
  recommendation: string;
  updatedAt: string;
};
