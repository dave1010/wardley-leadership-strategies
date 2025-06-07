import React from 'react';

interface ResultsProps {
  mapScore: number; // Strategic fit
  readinessScore: number; // Ability to execute
}

// Export for testing - This is the one to keep
export const getLevelFromScore = (score: number): 'Strong' | 'Weak' =>
  score >= 66 ? 'Strong' : 'Weak';

export const summaryText = (mapLevel: string, readinessLevel: string): string => {
  if (mapLevel === 'Strong' && readinessLevel === 'Strong') {
    return 'Proceed with confidence. The strategy aligns well with your context and you\'re well-prepared to execute.';
  } else if (mapLevel === 'Strong') {
    return 'Focus on improving execution readiness before proceeding. The strategy fits your context well.';
  } else if (readinessLevel === 'Strong') {
    return 'Reassess if this is the optimal strategy for your context, though your execution readiness is high.';
  } else {
    return 'Consider alternative strategies or address significant gaps before proceeding.';
  }
};

// Export for testing
export const positionScore = (raw: number): number => {
  const clamped = Math.max(0, Math.min(100, raw));
  const shifted = Math.max(0, clamped - 33);
  return Math.min(100, (shifted / 67) * 100);
};

const Results: React.FC<ResultsProps> = ({ mapScore, readinessScore }) => {
  const mapLevel = getLevelFromScore(mapScore);
  const readinessLevel = getLevelFromScore(readinessScore);
  const x = positionScore(mapScore);
  const y = 100 - positionScore(readinessScore); // invert y to match quadrant orientation

  return (
    <div>
      <p>
        Strategic Fit: <strong>{mapLevel}</strong>.
        Ability to Execute: <strong>{readinessLevel}</strong>.
      </p>
      <p className='theme-admonition theme-admonition-info alert alert--info' data-testid="results-summary-alert">
        <strong>RECOMMENDATION</strong><br />
        {summaryText(mapLevel, readinessLevel)}
      </p>
      <svg viewBox="-20 -20 140 140" width="100%" style={{ background: 'var(--ifm-background-color)', maxWidth: '500px' }}>
        {/* Quadrant borders */}
        <rect x="0" y="0" width="50" height="50" fill="none" stroke="var(--ifm-color-emphasis-300)" strokeWidth="0.5" />
        <rect x="50" y="0" width="50" height="50" fill="none" stroke="var(--ifm-color-emphasis-300)" strokeWidth="0.5" />
        <rect x="0" y="50" width="50" height="50" fill="none" stroke="var(--ifm-color-emphasis-300)" strokeWidth="0.5" />
        <rect x="50" y="50" width="50" height="50" fill="none" stroke="var(--ifm-color-emphasis-300)" strokeWidth="0.5" />

        <circle cx={x} cy={y} r="2.5" fill="var(--ifm-color-primary)" data-testid="results-svg-plot-dot" />

        {/* Axis Labels */}
        <text x="0" y="108" fontSize="6" textAnchor="start" fill="var(--ifm-color-content)">Low</text>
        <text x="100" y="108" fontSize="6" textAnchor="end" fill="var(--ifm-color-content)">High</text>
        <text x="50" y="114" fontSize="6" textAnchor="middle" fill="var(--ifm-color-content)">Strategic Fit</text>

        <text x="-6" y="17" transform="rotate(-90 -6 17)" fontSize="6" textAnchor="start" fill="var(--ifm-color-content)">High</text>
        <text x="-6" y="85" transform="rotate(-90 -6 85)" fontSize="6" textAnchor="end" fill="var(--ifm-color-content)">Low</text>
        <text x="-14" y="50" transform="rotate(-90 -14 50)" fontSize="6" textAnchor="middle" fill="var(--ifm-color-content)">Ability to Execute</text>
      </svg>
    </div>
  );
};

export default Results;