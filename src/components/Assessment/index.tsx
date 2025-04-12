import React, { useState, Children } from 'react';
import { AlertTriangle, CheckCircle, HelpCircle } from 'lucide-react';

const Assessment = ({ children }) => {
  const mapSignals = [];
  const readiness = [];

  Children.forEach(children, child => {
    if (!child || typeof child !== 'object') return;
    if (child.type === MapSignals) {
      mapSignals.push(...(Array.isArray(child.props.children) ? child.props.children : [child.props.children])
        .filter(Boolean)
        .map(c => c.props.children));
    } else if (child.type === Readiness) {
      readiness.push(...(Array.isArray(child.props.children) ? child.props.children : [child.props.children])
        .filter(Boolean)
        .map(c => c.props.children));
    }
  });

  const [selectedMapSignals, setSelectedMapSignals] = useState(Array(mapSignals.length).fill('amber'));
  const [selectedReadiness, setSelectedReadiness] = useState(Array(readiness.length).fill('amber'));

  const updateSelections = (index, type) => {
    const setter = type === 'map' ? setSelectedMapSignals : setSelectedReadiness;
    const values = type === 'map' ? selectedMapSignals : selectedReadiness;
    const updated = [...values];
    updated[index] = updated[index] === 'amber' ? 'green' : updated[index] === 'green' ? 'red' : 'amber';
    setter(updated);
  };

  const calcScore = (arr) => {
    const score = arr.reduce((acc, val) => {
      if (val === 'green') return acc + 100;
      if (val === 'amber') return acc + 50;
      return acc;
    }, 0);
    return Math.round(score / arr.length);
  };

  const getAssessment = (score) => score >= 75 ? 'Strong' : score >= 50 ? 'Moderate' : 'Weak';

  const icon = (level) => level === 'Strong' ? <CheckCircle size={16} /> : level === 'Moderate' ? <AlertTriangle size={16} /> : <HelpCircle size={16} />;
  const colorClass = (level) => level === 'Strong' ? 'text--success' : level === 'Moderate' ? 'text--warning' : 'text--danger';

  const mapScore = calcScore(selectedMapSignals);
  const readinessScore = calcScore(selectedReadiness);
  const mapLevel = getAssessment(mapScore);
  const readinessLevel = getAssessment(readinessScore);

  const summaryText = () => {
    if (mapLevel === "Strong" && readinessLevel === "Strong") {
      return "Proceed with confidence. The strategy aligns well with your context and you're well-prepared to execute.";
    } else if (mapLevel === "Strong" && readinessLevel === "Moderate") {
      return "Focus on improving execution readiness before proceeding. The strategy fits your context well.";
    } else if (mapLevel === "Moderate" && readinessLevel === "Strong") {
      return "Reassess if this is the optimal strategy for your context, though your execution readiness is high.";
    } else {
      return "Consider alternative strategies or address significant gaps before proceeding.";
    }
  };

  return (
    <div className="container margin-vert--lg">
      <div className="card shadow--md">
        <div className="card__header">
          <h2>Strategy Self-Assessment</h2>
          <p>Select the statements that apply to your situation. This helps assess strategic fit and readiness.</p>
        </div>

        <div className="card__body">
          <h3>Map Signals</h3>
          {mapSignals.map((text, idx) => (
            <div
              key={idx}
              onClick={() => updateSelections(idx, 'map')}
              style={{
                backgroundColor:
                  selectedMapSignals[idx] === 'green'
                    ? 'var(--ifm-color-success-lightest)'
                    : selectedMapSignals[idx] === 'red'
                      ? 'var(--ifm-color-danger-lightest)'
                      : 'var(--ifm-background-color)',
                border: '1px solid var(--ifm-color-emphasis-200)',
                padding: '0.5rem',
                marginBottom: '0.5rem',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              {text}
            </div>
          ))}

          <h3>Readiness</h3>
          {readiness.map((text, idx) => (
            <div
              key={idx}
              onClick={() => updateSelections(idx, 'readiness')}
              style={{
                backgroundColor:
                  selectedReadiness[idx] === 'green'
                    ? 'var(--ifm-color-success-lightest)'
                    : selectedReadiness[idx] === 'red'
                      ? 'var(--ifm-color-danger-lightest)'
                      : 'var(--ifm-background-color)',
                border: '1px solid var(--ifm-color-emphasis-200)',
                padding: '0.5rem',
                marginBottom: '0.5rem',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              {text}
            </div>
          ))}

          <h3>Assessment</h3>
          <p className={`margin-bottom--sm flex ${colorClass(mapLevel)}`}>{icon(mapLevel)} <span className="margin-left--sm">Map Signals: {mapLevel} ({mapScore}%)</span></p>
          <p className={`margin-bottom--sm flex ${colorClass(readinessLevel)}`}>{icon(readinessLevel)} <span className="margin-left--sm">Readiness: {readinessLevel} ({readinessScore}%)</span></p>
          <p className="margin-top--sm">{summaryText()}</p>
        </div>
      </div>
    </div>
  );
};

export const MapSignals = ({ children }) => <>{children}</>;
export const Readiness = ({ children }) => <>{children}</>;

export default Assessment;