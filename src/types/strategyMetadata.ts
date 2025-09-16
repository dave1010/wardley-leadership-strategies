export type StrategyMetadata = {
  id: string;
  title: string;
  description: string;
  permalink: string;
  category: string;
  tags: string[];
  evolutionStage?: string;
  strategicInsightArea?: string;
  ethicalAlignment?: string;
  leadershipSkills: string[];
  whenToUse?: string;
  whenToAvoid?: string;
  coreChallenge?: string;
  relatedStrategies: string[];
  authors: string[];
};

export type StrategyMetadataGlobalData = {
  strategies: StrategyMetadata[];
};
