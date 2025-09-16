import {
  AssessmentSection,
  AssessmentSummary,
  StoredSectionState,
  TrafficLight,
} from '@site/src/components/Assessment/types';

const STORAGE_PREFIX = 'wardley-assessment';
const SECTION_PREFIX = `${STORAGE_PREFIX}:section`;
const SUMMARY_PREFIX = `${STORAGE_PREFIX}:summary`;
const REGISTRY_KEY = `${STORAGE_PREFIX}:registry`;
const ALL_SECTIONS: AssessmentSection[] = ['map', 'readiness'];

const canUseStorage = (): boolean => typeof window !== 'undefined' && !!window.localStorage;

const encodeId = (value: string): string => encodeURIComponent(value);

const getSectionKey = (id: string, section: AssessmentSection): string =>
  `${SECTION_PREFIX}:${encodeId(id)}:${section}`;

const getSummaryKey = (id: string): string => `${SUMMARY_PREFIX}:${encodeId(id)}`;

function readJson<T>(key: string): T | null {
  if (!canUseStorage()) {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) {
      return null;
    }
    return JSON.parse(raw) as T;
  } catch (error) {
    console.warn('Unable to parse assessment data from localStorage', error);
    return null;
  }
}

function writeJson(key: string, value: unknown): void {
  if (!canUseStorage()) {
    return;
  }

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn('Unable to write assessment data to localStorage', error);
  }
}

function removeItem(key: string): void {
  if (!canUseStorage()) {
    return;
  }
  window.localStorage.removeItem(key);
}

function readRegistry(): string[] {
  return readJson<string[]>(REGISTRY_KEY) ?? [];
}

function writeRegistry(ids: string[]): void {
  if (ids.length === 0) {
    removeItem(REGISTRY_KEY);
    return;
  }
  writeJson(REGISTRY_KEY, Array.from(new Set(ids)));
}

function registerStrategy(id: string): void {
  if (!canUseStorage()) {
    return;
  }
  const registry = readRegistry();
  if (!registry.includes(id)) {
    registry.push(id);
    writeRegistry(registry);
  }
}

function unregisterStrategy(id: string): void {
  if (!canUseStorage()) {
    return;
  }
  const registry = readRegistry().filter((entry) => entry !== id);
  writeRegistry(registry);
}

export const loadSectionState = (
  id: string,
  section: AssessmentSection,
): StoredSectionState | null => readJson<StoredSectionState>(getSectionKey(id, section));

export const saveSectionState = (
  id: string,
  section: AssessmentSection,
  values: TrafficLight[],
): void => {
  const payload: StoredSectionState = {
    values,
    updatedAt: new Date().toISOString(),
  };
  writeJson(getSectionKey(id, section), payload);
};

export const clearSectionState = (id: string, section: AssessmentSection): void => {
  removeItem(getSectionKey(id, section));
};

export const saveSummary = (summary: AssessmentSummary): void => {
  writeJson(getSummaryKey(summary.id), summary);
  registerStrategy(summary.id);
};

export const loadSummary = (id: string): AssessmentSummary | null =>
  readJson<AssessmentSummary>(getSummaryKey(id));

export const removeSummary = (id: string): void => {
  removeItem(getSummaryKey(id));
  unregisterStrategy(id);
};

export const getAllSummaries = (): AssessmentSummary[] => {
  const registry = readRegistry();
  return registry
    .map((id) => loadSummary(id))
    .filter((summary): summary is AssessmentSummary => summary != null)
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
};

export const clearStrategy = (id: string): void => {
  ALL_SECTIONS.forEach((section) => clearSectionState(id, section));
  removeSummary(id);
};

export const clearAllAssessments = (): void => {
  const registry = readRegistry();
  registry.forEach((id) => {
    ALL_SECTIONS.forEach((section) => clearSectionState(id, section));
    removeItem(getSummaryKey(id));
  });
  removeItem(REGISTRY_KEY);
};

export const isStorageAvailable = canUseStorage;

