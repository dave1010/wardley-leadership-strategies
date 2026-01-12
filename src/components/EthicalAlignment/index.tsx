import React from 'react';
import Admonition from '@theme/Admonition';
import {useDoc} from '@docusaurus/plugin-content-docs/client';

type EthicalRiskLevel = 'low' | 'moderate' | 'high';

type EthicalProfile = {
  risk_level?: EthicalRiskLevel;
  stance?: string;
  approach?: string;
  intent?: string;
  time_horizon?: string;
  sustainability?: string;
  [key: string]: string | undefined;
};

type EthicalFrontMatter = {
  ethical_profile?: EthicalProfile;
  ethical_summary?: string;
};

type AdmonitionType = 'tip' | 'info' | 'warning' | 'danger' | 'note' | 'caution' | 'success';

const RISK_METADATA: Record<
  EthicalRiskLevel,
  {type: AdmonitionType; label: string; description: string}
> = {
  low: {
    type: 'tip',
    label: 'Low Ethical Risk',
    description: 'Generally aligned with shared benefit and low potential for harm when executed with transparency.',
  },
  moderate: {
    type: 'warning',
    label: 'Contextual Ethical Risk',
    description: 'Impact depends on governance and intent — safeguards and proportionality really matter.',
  },
  high: {
    type: 'danger',
    label: 'High Ethical Risk',
    description: 'Prone to exploitation or harm; requires exceptional justification, oversight, and exit criteria.',
  },
};

const ORDERED_KEYS = ['stance', 'approach', 'intent', 'time_horizon', 'sustainability'];

const formatKey = (key: string): string =>
  key
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());

const formatValue = (value: string): string =>
  value
    .replace(/[_-]/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());

const hasContent = (profile: EthicalProfile | undefined, summary?: string) => {
  if (summary && summary.trim().length > 0) {
    return true;
  }

  if (!profile) {
    return false;
  }

  const {risk_level: riskLevel, ...rest} = profile;

  if (riskLevel) {
    return true;
  }

  return Object.values(rest).some((value) => Boolean(value && value.trim().length > 0));
};

const getOrderedEntries = (profile: EthicalProfile) => {
  const entries: Array<[string, string]> = [];
  ORDERED_KEYS.forEach((key) => {
    const value = profile[key];
    if (value && value.trim().length > 0) {
      entries.push([key, value]);
    }
  });

  Object.entries(profile).forEach(([key, value]) => {
    if (
      key === 'risk_level' ||
      ORDERED_KEYS.includes(key) ||
      !value ||
      value.trim().length === 0
    ) {
      return;
    }

    entries.push([key, value]);
  });

  return entries;
};

export default function EthicalAlignment(): JSX.Element | null {
  const {frontMatter} = useDoc();
  const {ethical_profile: profile, ethical_summary: summary} = frontMatter as EthicalFrontMatter;

  if (!hasContent(profile, summary)) {
    return null;
  }

  const riskLevel = profile?.risk_level;
  const risk = riskLevel ? RISK_METADATA[riskLevel] : undefined;
  const entries = profile ? getOrderedEntries(profile) : [];

  return (
    <Admonition type={risk?.type ?? 'info'} title={risk ? `Ethical Alignment · ${risk.label}` : 'Ethical Alignment'}>
      {risk && <p>{risk.description}</p>}
      {entries.length > 0 && (
        <ul>
          {entries.map(([key, value]) => (
            <li key={key}>
              <strong>{formatKey(key)}:</strong> {formatValue(value)}
            </li>
          ))}
        </ul>
      )}
      {summary && <p>{summary}</p>}
    </Admonition>
  );
}
