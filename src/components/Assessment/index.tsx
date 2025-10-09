import React, { useCallback, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import Results, { getLevelFromScore, summaryText } from './Results';
import SignalList from './SignalList';
import { extractStatements } from './parseChildren';
import AssessmentToolAdvert from './AssessmentToolAdvert';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import {
  clearStrategy,
  isStorageAvailable,
  saveSummary,
} from '@site/src/utils/assessmentStorage';
import { TrafficLight } from './types';

type AssessmentSectionProps = {
  children?: ReactNode;
};

export const MapSignals: React.FC<AssessmentSectionProps> = ({ children }) => <>{children}</>;
export const Readiness: React.FC<AssessmentSectionProps> = ({ children }) => <>{children}</>;
export { AssessmentToolAdvert };

const useOptionalDoc = (): ReturnType<typeof useDoc> | null => {
  try {
    return useDoc();
  } catch (error) {
    return null;
  }
};

const Assessment = ({ children, strategyName }) => {
  const mapSignals = extractStatements(children, MapSignals);
  const readiness = extractStatements(children, Readiness);

  const [mapScore, setMapScore] = useState(0);
  const [readinessScore, setReadinessScore] = useState(0);
  const [mapTouched, setMapTouched] = useState(false);
  const [readinessTouched, setReadinessTouched] = useState(false);
  const docContext = useOptionalDoc();
  const metadata = docContext?.metadata;

  const storageId = metadata?.permalink ?? strategyName;
  const strategyTitle = metadata?.title ?? strategyName;
  const permalink = metadata?.permalink;

  const handleMapChange = useCallback(
    (score: number, values: TrafficLight[], interacted: boolean) => {
      setMapScore(score);
      setMapTouched(interacted);
    },
    [],
  );

  const handleReadinessChange = useCallback(
    (score: number, values: TrafficLight[], interacted: boolean) => {
      setReadinessScore(score);
      setReadinessTouched(interacted);
    },
    [],
  );

  const hasAnyInteraction = mapTouched || readinessTouched;

  useEffect(() => {
    if (!isStorageAvailable() || !storageId) {
      return;
    }

    if (!hasAnyInteraction) {
      clearStrategy(storageId);
      return;
    }

    const mapLevel = getLevelFromScore(mapScore);
    const readinessLevel = getLevelFromScore(readinessScore);
    const recommendation = summaryText(mapLevel, readinessLevel);

    saveSummary({
      id: storageId,
      strategyName,
      strategyTitle,
      permalink,
      mapScore,
      readinessScore,
      mapLevel,
      readinessLevel,
      recommendation,
      updatedAt: new Date().toISOString(),
    });
  }, [
    hasAnyInteraction,
    mapScore,
    readinessScore,
    storageId,
    strategyName,
    strategyTitle,
    permalink,
  ]);

  return (
    <div className="container margin-vert--lg" id="assessment-tool">
      <div className="card shadow--md">
        <div className="card__header">
          <h2>🚦 <strong>{strategyName} Strategy Self-Assessment Tool</strong></h2>
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
            storageId={storageId}
            section="map"
            onChange={handleMapChange}
          />

          <SignalList
            title="Organisational Readiness (Doctrine)"
            description="How capable is your organisation to execute the strategy?"
            items={readiness}
            storageId={storageId}
            section="readiness"
            onChange={handleReadinessChange}
          />

          <h3>Assessment and Recommendation</h3>
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
