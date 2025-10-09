import React from 'react';
import { beforeEach, describe, it, jest } from '@jest/globals';
import { render, screen, act } from '@testing-library/react';
import Assessment, { MapSignals, Readiness } from './index'; // Assuming MapSignals and Readiness are exported from here
import { TrafficLight } from './types';
import type { ComponentProps } from 'react';

// --- Mocks ---
// Mock './parseChildren' first
jest.mock('./parseChildren', () => ({
  extractStatements: jest.fn(),
}));

jest.mock('@docusaurus/plugin-content-docs/client', () => ({
  useDoc: jest.fn(() => ({
    metadata: {
      title: 'Mock Strategy Title',
      permalink: '/mock-permalink',
    },
  })),
}));

jest.mock('@site/src/utils/assessmentStorage', () => ({
  isStorageAvailable: jest.fn(() => false),
  clearStrategy: jest.fn(),
  saveSummary: jest.fn(),
}));

// THEN import the mocked function to get a reference to the mock
// Note: This import must come AFTER jest.mock
const { extractStatements: _mockExtractStatementsUnsafe } = require('./parseChildren');
const mockExtractStatements = _mockExtractStatementsUnsafe as jest.Mock;

type SignalListComponent = typeof import('./SignalList').default;
type ResultsComponent = typeof import('./Results').default;
type SignalListProps = ComponentProps<SignalListComponent>;
type ResultsProps = ComponentProps<ResultsComponent>;


// Callbacks store needs to be defined outside and before the mock factories
const mockSignalListOnChangeCallbacks: Record<
  string,
  (score: number, values: TrafficLight[], interacted: boolean) => void
> = {};

jest.mock('./SignalList', () => {
  const MockedSignalList = jest.fn(
    ({
      title,
      items,
      onChange,
    }: {
      title: string;
      items: string[];
      section: string;
      storageId: string;
      onChange: (score: number, values: TrafficLight[], interacted: boolean) => void;
    }) => {
      if (title === "Landscape and Climate") {
        mockSignalListOnChangeCallbacks.map = onChange;
      } else if (title === "Organisational Readiness (Doctrine)") {
        mockSignalListOnChangeCallbacks.readiness = onChange;
      }
      return (
        <div data-testid={`mock-signallist-${title.toLowerCase().replace(/\s+/g, '-')}`}>
          <h3>{title}</h3>
          <ul>{items.map((item: string) => <li key={item}>{item}</li>)}</ul>
        </div>
      );
    }
  );
  return { __esModule: true, default: MockedSignalList };
});

jest.mock('./Results', () => {
  const MockedResults = jest.fn(
    ({ mapScore, readinessScore }: { mapScore: number; readinessScore: number; }) => (
      <div data-testid="mock-results">
        <p>Map Score: {mapScore}</p>
        <p>Readiness Score: {readinessScore}</p>
      </div>
    )
  );
  return { __esModule: true, default: MockedResults };
});

// Import the mocked components to get a reference to the jest.fn()
import SignalList from './SignalList'; // This will be the mocked version's default export
import Results from './Results';     // This will be the mocked version's default export

// --- End Mocks ---

const signalListMock = SignalList as jest.MockedFunction<SignalListComponent>;
const resultsMock = Results as jest.MockedFunction<ResultsComponent>;

describe('Assessment Component', () => {
  const strategyName = "Test Strategy";
  const mockMapItems = ['map item 1', 'map item 2'];
  const mockReadinessItems = ['readiness item 1', 'readiness item 2', 'readiness item 3'];

  beforeEach(() => {
    // Reset mocks before each test
    mockExtractStatements.mockReset();
    signalListMock.mockClear();
    resultsMock.mockClear();
    mockSignalListOnChangeCallbacks.map = undefined;
    mockSignalListOnChangeCallbacks.readiness = undefined;

    // Setup default mock behavior for extractStatements
    mockExtractStatements.mockImplementation((_children, targetType) => {
      if (targetType === MapSignals) {
        return mockMapItems;
      }
      if (targetType === Readiness) {
        return mockReadinessItems;
      }
      return [];
    });
  });

  // Test 1: Basic Rendering
  it('renders basic structure with strategy name and child components', () => {
    render(
      <Assessment strategyName={strategyName}>
        <MapSignals>{/* Mock children for MapSignals */}</MapSignals>
        <Readiness>{/* Mock children for Readiness */}</Readiness>
      </Assessment>
    );

    // Verify strategy name
    expect(screen.getByText(new RegExp(strategyName, "i"))).toBeInTheDocument();
    expect(screen.getByText(/Strategy Self-Assessment Tool/i)).toBeInTheDocument();

    // Verify SignalList components are rendered (via their mock test IDs)
    expect(screen.getByTestId('mock-signallist-landscape-and-climate')).toBeInTheDocument();
    expect(screen.getByTestId('mock-signallist-organisational-readiness-(doctrine)')).toBeInTheDocument();

    // Verify Results component is rendered (via its mock test ID)
    expect(screen.getByTestId('mock-results')).toBeInTheDocument();
    expect(screen.getByText('Assessment and Recommendation')).toBeInTheDocument();
  });

  // Test 2: Props Passing to SignalList
  it('passes correct items from extractStatements to SignalList components', () => {
    render(
      <Assessment strategyName={strategyName}>
        <MapSignals> {/* children don't matter here due to mock */} </MapSignals>
        <Readiness> {/* children don't matter here due to mock */} </Readiness>
      </Assessment>
    );

    expect(mockExtractStatements).toHaveBeenCalledWith(expect.anything(), MapSignals);
    expect(mockExtractStatements).toHaveBeenCalledWith(expect.anything(), Readiness);

    // Check props passed to the first SignalList (Landscape)
    const firstSignalListCallArgs = signalListMock.mock.calls[0][0] as SignalListProps;
    expect(firstSignalListCallArgs.title).toBe("Landscape and Climate");
    expect(firstSignalListCallArgs.description).toBe("How well does the strategy fit your context?");
    expect(firstSignalListCallArgs.items).toEqual(mockMapItems);
    expect(firstSignalListCallArgs.onChange).toEqual(expect.any(Function));
    expect(firstSignalListCallArgs.section).toBe('map');
    expect(firstSignalListCallArgs.storageId).toBeTruthy();
    // expect(SignalList).toHaveBeenNthCalledWith(
    //   1, // First call
    //   expect.objectContaining({
    //     title: "Landscape and Climate",
    //     description: "How well does the strategy fit your context?",
    //     items: mockMapItems,
    //     onScoreChange: expect.any(Function),
    //   })
    // );

    // Check props passed to the second SignalList (Readiness)
    const secondSignalListCallArgs = signalListMock.mock.calls[1][0] as SignalListProps;
    expect(secondSignalListCallArgs.title).toBe("Organisational Readiness (Doctrine)");
    expect(secondSignalListCallArgs.description).toBe("How capable is your organisation to execute the strategy?");
    expect(secondSignalListCallArgs.items).toEqual(mockReadinessItems);
    expect(secondSignalListCallArgs.onChange).toEqual(expect.any(Function));
    expect(secondSignalListCallArgs.section).toBe('readiness');
    expect(secondSignalListCallArgs.storageId).toBeTruthy();
    // expect(SignalList).toHaveBeenNthCalledWith(
    //   2, // Second call
    //   expect.objectContaining({
    //     title: "Organisational Readiness (Doctrine)",
    //     description: "How capable is your organisation to execute the strategy?",
    //     items: mockReadinessItems,
    //     onScoreChange: expect.any(Function),
    //   })
    // );
  });

  // Test 3: Props Passing to Results (Initial)
  it('passes initial scores (0) to Results component', () => {
    render(
      <Assessment strategyName={strategyName}>
        <MapSignals />
        <Readiness />
      </Assessment>
    );

    const resultsProps = resultsMock.mock.calls[0][0] as ResultsProps;
    expect(resultsProps.mapScore).toBe(0);
    expect(resultsProps.readinessScore).toBe(0);
    // expect(Results).toHaveBeenCalledWith(
    //   expect.objectContaining({
    //     mapScore: 0,
    //     readinessScore: 0,
    //   })
    // );
    // Also check the rendered output from the mock
    expect(screen.getByTestId('mock-results')).toHaveTextContent("Map Score: 0");
    expect(screen.getByTestId('mock-results')).toHaveTextContent("Readiness Score: 0");
  });

  // Test 4: Score Updates
  describe('Score Updates', () => {
    it('updates mapScore in Results when Landscape SignalList onScoreChange is called', () => {
      render(
        <Assessment strategyName={strategyName}>
          <MapSignals />
          <Readiness />
        </Assessment>
      );

      // Ensure the onScoreChange callback for map was captured
      expect(mockSignalListOnChangeCallbacks.map).toBeDefined();

      const newMapScore = 75;
      act(() => {
        mockSignalListOnChangeCallbacks.map!(
          newMapScore,
          ['green'] as TrafficLight[],
          true,
        );
      });

      // Results mock should be called again with the new mapScore
      const lastResultsCallArgs_mapUpdate = resultsMock.mock.calls.slice(-1)[0]?.[0] as ResultsProps | undefined;
      expect(lastResultsCallArgs_mapUpdate.mapScore).toBe(newMapScore);
      expect(lastResultsCallArgs_mapUpdate.readinessScore).toBe(0);
      // expect(Results).toHaveBeenLastCalledWith(
      //   expect.objectContaining({
      //     mapScore: newMapScore,
      //     readinessScore: 0, // Readiness score should remain initial
      //   })
      // );
      expect(screen.getByTestId('mock-results')).toHaveTextContent(`Map Score: ${newMapScore}`);
      expect(screen.getByTestId('mock-results')).toHaveTextContent("Readiness Score: 0");
    });

    it('updates readinessScore in Results when Readiness SignalList onScoreChange is called', () => {
      render(
        <Assessment strategyName={strategyName}>
          <MapSignals />
          <Readiness />
        </Assessment>
      );

      // Ensure the onScoreChange callback for readiness was captured
      expect(mockSignalListOnChangeCallbacks.readiness).toBeDefined();

      const newReadinessScore = 60;
      act(() => {
        mockSignalListOnChangeCallbacks.readiness!(
          newReadinessScore,
          ['green'] as TrafficLight[],
          true,
        );
      });

      // Results mock should be called again with the new readinessScore
      const lastResultsCallArgs_readinessUpdate = resultsMock.mock.calls.slice(-1)[0]?.[0] as ResultsProps | undefined;
      expect(lastResultsCallArgs_readinessUpdate.mapScore).toBe(0);
      expect(lastResultsCallArgs_readinessUpdate.readinessScore).toBe(newReadinessScore);
      // expect(Results).toHaveBeenLastCalledWith(
      //   expect.objectContaining({
      //     mapScore: 0, // Map score should remain initial
      //     readinessScore: newReadinessScore,
      //   })
      // );
      expect(screen.getByTestId('mock-results')).toHaveTextContent("Map Score: 0");
      expect(screen.getByTestId('mock-results')).toHaveTextContent(`Readiness Score: ${newReadinessScore}`);
    });

    it('updates both scores in Results when both SignalList onScoreChange are called', () => {
      render(
        <Assessment strategyName={strategyName}>
          <MapSignals />
          <Readiness />
        </Assessment>
      );

      expect(mockSignalListOnChangeCallbacks.map).toBeDefined();
      expect(mockSignalListOnChangeCallbacks.readiness).toBeDefined();

      const newMapScore = 80;
      const newReadinessScore = 70;

      act(() => {
        mockSignalListOnChangeCallbacks.map!(
          newMapScore,
          ['green'] as TrafficLight[],
          true,
        );
      });
      // Check intermediate update for map score
      const resultsCallArgs_mapUpdate = resultsMock.mock.calls.slice(-1)[0]?.[0] as ResultsProps | undefined;
      expect(resultsCallArgs_mapUpdate.mapScore).toBe(newMapScore);
      expect(resultsCallArgs_mapUpdate.readinessScore).toBe(0);
      // expect(Results).toHaveBeenLastCalledWith(
      //   expect.objectContaining({ mapScore: newMapScore, readinessScore: 0 })
      // );
      expect(screen.getByTestId('mock-results')).toHaveTextContent(`Map Score: ${newMapScore}`);
      

      act(() => {
        mockSignalListOnChangeCallbacks.readiness!(
          newReadinessScore,
          ['green'] as TrafficLight[],
          true,
        );
      });
      // Check final update for readiness score
      const resultsCallArgs_bothUpdate = resultsMock.mock.calls.slice(-1)[0]?.[0] as ResultsProps | undefined;
      expect(resultsCallArgs_bothUpdate.mapScore).toBe(newMapScore);
      expect(resultsCallArgs_bothUpdate.readinessScore).toBe(newReadinessScore);
      // expect(Results).toHaveBeenLastCalledWith(
      //   expect.objectContaining({
      //     mapScore: newMapScore, // Map score should persist
      //     readinessScore: newReadinessScore,
      //   })
      // );
      expect(screen.getByTestId('mock-results')).toHaveTextContent(`Map Score: ${newMapScore}`);
      expect(screen.getByTestId('mock-results')).toHaveTextContent(`Readiness Score: ${newReadinessScore}`);
    });
  });
});
