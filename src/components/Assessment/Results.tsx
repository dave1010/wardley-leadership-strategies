import React from 'react';
import { CheckCircle, AlertTriangle, HelpCircle } from 'lucide-react';

type Level = 'Strong' | 'Moderate' | 'Weak';

interface ResultsProps {
    mapScore: number;
    readinessScore: number;
}

const getLevelFromScore = (score) => score >= 75 ? 'Strong' : score >= 50 ? 'Moderate' : 'Weak';

const icon = (level: Level) =>
  level === 'Strong' ? <CheckCircle size={16} /> :
  level === 'Moderate' ? <AlertTriangle size={16} /> :
  <HelpCircle size={16} />;

const colorClass = (level: Level) =>
  level === 'Strong' ? 'text--success' :
  level === 'Moderate' ? 'text--warning' :
  'text--danger';

const summaryText = (mapLevel: Level, readinessLevel: Level): string => {
  if (mapLevel === 'Strong' && readinessLevel === 'Strong') {
    return 'Proceed with confidence. The strategy aligns well with your context and you\'re well-prepared to execute.';
  } else if (mapLevel === 'Strong' && readinessLevel === 'Moderate') {
    return 'Focus on improving execution readiness before proceeding. The strategy fits your context well.';
  } else if (mapLevel === 'Moderate' && readinessLevel === 'Strong') {
    return 'Reassess if this is the optimal strategy for your context, though your execution readiness is high.';
  } else {
    return 'Consider alternative strategies or address significant gaps before proceeding.';
  }
};

const Results: React.FC<ResultsProps> = ({ mapScore, readinessScore }) => {
    const mapLevel = getLevelFromScore(mapScore);
    const readinessLevel = getLevelFromScore(readinessScore);

    return (
        <>
            <p className={`margin-bottom--sm flex ${colorClass(mapLevel)}`}>
                {icon(mapLevel)} <span className="margin-left--sm">Map Signals: {mapLevel} ({mapScore}%)</span>
            </p>
            <p className={`margin-bottom--sm flex ${colorClass(readinessLevel)}`}>
                {icon(readinessLevel)} <span className="margin-left--sm">Readiness: {readinessLevel} ({readinessScore}%)</span>
            </p>
            <p className="margin-top--sm">{summaryText(mapLevel, readinessLevel)}</p>
        </>
    );
};

export default Results;
