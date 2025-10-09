import React from 'react';
import { describe, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import Results, { getLevelFromScore, summaryText, positionScore } from './Results';

describe('Results Component', () => {
  describe('Summary Text Rendering', () => {
    // Test cases: [mapScore, readinessScore, expectedMapLevel, expectedReadinessLevel]
    const testCases = [
      { mapScore: 70, readinessScore: 70, expectedTextKey: 'StrongStrong' }, // Strong/Strong
      { mapScore: 70, readinessScore: 50, expectedTextKey: 'StrongWeak' },   // Strong/Weak
      { mapScore: 50, readinessScore: 70, expectedTextKey: 'WeakStrong' },   // Weak/Strong
      { mapScore: 50, readinessScore: 50, expectedTextKey: 'WeakWeak' },     // Weak/Weak
      // Edge cases for getLevelFromScore
      { mapScore: 66, readinessScore: 66, expectedTextKey: 'StrongStrong' }, // Strong/Strong (boundary)
      { mapScore: 65, readinessScore: 65, expectedTextKey: 'WeakWeak' },     // Weak/Weak (boundary)
      { mapScore: 100, readinessScore: 100, expectedTextKey: 'StrongStrong' },// Strong/Strong (max scores)
      { mapScore: 0, readinessScore: 0, expectedTextKey: 'WeakWeak' },        // Weak/Weak (min scores)
    ];

    testCases.forEach(({ mapScore, readinessScore, expectedTextKey }) => {
      const mapLevel = getLevelFromScore(mapScore);
      const readinessLevel = getLevelFromScore(readinessScore);
      const expectedSummary = summaryText(mapLevel, readinessLevel);
      const testTitle = `renders correct summary for mapScore ${mapScore} (${mapLevel}) and readinessScore ${readinessScore} (${readinessLevel})`;

      it(testTitle, () => {
        render(<Results mapScore={mapScore} readinessScore={readinessScore} />);

        // Check for level display
        expect(screen.getByText(`Strategic Fit:`, { exact: false })).toHaveTextContent(`Strategic Fit: ${mapLevel}`);
        expect(screen.getByText(`Ability to Execute:`, { exact: false })).toHaveTextContent(`Ability to Execute: ${readinessLevel}`);

        // Check for summary text within the admonition block
        const admonitionElement = screen.getByTestId('results-summary-alert');
        expect(admonitionElement).toHaveTextContent(expectedSummary);
      });
    });
  });

  describe('SVG Chart Dot Position', () => {
    // Test cases: [mapScore, readinessScore]
    // positionScore(raw) logic: clamped = max(0, min(100, raw)); shifted = max(0, clamped - 33); return min(100, (shifted / 67) * 100);
    // cx = positionScore(mapScore)
    // cy = 100 - positionScore(readinessScore)
    const scoreToPositionTestCases = [
      { mapScore: 75, readinessScore: 75 }, // Expected: Both Strong, mid-range of "Strong"
      { mapScore: 50, readinessScore: 50 }, // Expected: Both Weak, mid-range of "Weak" (but post-33 clamping)
      { mapScore: 100, readinessScore: 100 },// Expected: Max scores
      { mapScore: 0, readinessScore: 0 },    // Expected: Min scores (cx=0, cy=100)
      { mapScore: 33, readinessScore: 33 },  // Expected: Scores at the clamping boundary (cx=0, cy=100)
      { mapScore: 66, readinessScore: 66 },  // Expected: Scores at "Strong" boundary
      { mapScore: 80, readinessScore: 20 },  // Mixed scores
    ];

    scoreToPositionTestCases.forEach(({ mapScore, readinessScore }) => {
      const expectedCx = positionScore(mapScore);
      const expectedCy = 100 - positionScore(readinessScore);
      const testTitle = `renders dot at cx=${expectedCx.toFixed(2)}, cy=${expectedCy.toFixed(2)} for mapScore=${mapScore}, readinessScore=${readinessScore}`;

      it(testTitle, () => {
        render(<Results mapScore={mapScore} readinessScore={readinessScore} />);
        const circleElement = screen.getByTestId('results-svg-plot-dot');

        // Attributes are strings, so compare them as such, potentially with toFixed for precision
        expect(circleElement).toHaveAttribute('cx', expectedCx.toString());
        expect(circleElement).toHaveAttribute('cy', expectedCy.toString());
      });
    });

    // Specific test for precision if numbers are not integers
     it('renders dot with precision for non-integer positions', () => {
        const mapScore = 70; // positionScore(70) = ((70-33)/67)*100 = (37/67)*100 = 55.22388...
        const readinessScore = 80; // positionScore(80) = ((80-33)/67)*100 = (47/67)*100 = 70.14925...
        const expectedCx = positionScore(mapScore); // approx 55.22
        const expectedCy = 100 - positionScore(readinessScore); // approx 100 - 70.15 = 29.85

        render(<Results mapScore={mapScore} readinessScore={readinessScore} />);
        const circleElement = screen.getByTestId('results-svg-plot-dot');

        // Check with a tolerance or by comparing rounded values if exact match is tricky due to floating point
        expect(parseFloat(circleElement.getAttribute('cx')!)).toBeCloseTo(expectedCx, 2);
        expect(parseFloat(circleElement.getAttribute('cy')!)).toBeCloseTo(expectedCy, 2);
     });

  });
});
