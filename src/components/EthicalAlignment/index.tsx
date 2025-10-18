import React from 'react';
import Admonition from '@theme/Admonition';
import {useDoc} from '@docusaurus/plugin-content-docs/client';

type EthicalProfile = Record<string, string | undefined>;

type EthicalFrontMatter = {
  ethical_profile?: EthicalProfile;
  ethical_summary?: string;
};

const formatKey = (key: string): string =>
  key
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());

const hasContent = (profile: EthicalProfile | undefined, summary?: string) => {
  if (summary && summary.trim().length > 0) {
    return true;
  }

  if (!profile) {
    return false;
  }

  return Object.values(profile).some((value) => Boolean(value && value.trim().length > 0));
};

export default function EthicalAlignment(): JSX.Element | null {
  const {frontMatter} = useDoc();
  const {ethical_profile: profile, ethical_summary: summary} = frontMatter as EthicalFrontMatter;

  if (!hasContent(profile, summary)) {
    return null;
  }

  const entries = Object.entries(profile ?? {}).filter(([, value]) => Boolean(value && value.trim().length > 0));

  return (
    <Admonition type="tip" title="Ethical Alignment">
      {entries.length > 0 && (
        <ul>
          {entries.map(([key, value]) => (
            <li key={key}>
              <strong>{formatKey(key)}:</strong> {value}
            </li>
          ))}
        </ul>
      )}
      {summary && <p>{summary}</p>}
    </Admonition>
  );
}
