import React, { useState } from 'react';
import Results from './Results';
import SignalList from './SignalList';
import { extractStatements } from './parseChildren';

export const MapSignals = ({ children }) => <>{children}</>;
export const Readiness = ({ children }) => <>{children}</>;

const Assessment = ({ children }) => {
  const mapSignals = extractStatements(children, MapSignals);
  const readiness = extractStatements(children, Readiness);

  const [mapScore, setMapScore] = useState(0);
  const [readinessScore, setReadinessScore] = useState(0);

  return (
    <div className="container margin-vert--lg" id="assessment-tool">
      <div className="card shadow--md">
        <div className="card__header">
          <h2>Strategy Self-Assessment Tool</h2>
          <p>
            Find out the strategic fit and organisational readiness by marking each statement as Yes/Maybe/No based on your context.{' '}
            <a href="/about/assessment-tool">Strategy Assessment Guide</a>.
          </p>
        </div>

        <div className="card__body">
          <SignalList
            title="Landscape and Climate"
            description="How well does the strategy fit your context?"
            items={mapSignals}
            onScoreChange={setMapScore}
          />

          <SignalList
            title="Organisational Readiness (Doctrine)"
            description="How capable is your organisation to execute the strategy?"
            items={readiness}
            onScoreChange={setReadinessScore}
          />

          <h3>Assessment</h3>
          <Results
            mapScore={mapScore}
            readinessScore={readinessScore}
          />
        </div>
      </div>
    </div>
  );
};

export default Assessment;
