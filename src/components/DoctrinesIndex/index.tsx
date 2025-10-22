import React from 'react';
import type { ReactElement } from 'react';
import Link from '@docusaurus/Link';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { usePluginData } from '@docusaurus/useGlobalData';

import styles from './styles.module.css';

type DoctrineGroupingKey = 'stage' | 'category';

interface DoctrineSummary {
  slug: string;
  title: string;
  stage: string;
  category: string;
}

interface DoctrinesIndexData {
  dataPath: string;
  count: number;
  doctrines: DoctrineSummary[];
}

interface DoctrineGroup {
  label: string;
  items: DoctrineSummary[];
}

function groupDoctrines(
  doctrines: DoctrineSummary[],
  property: DoctrineGroupingKey,
): DoctrineGroup[] {
  const groups = new Map<string, DoctrineSummary[]>();

  doctrines.forEach(doctrine => {
    const value = doctrine[property];
    if (!value) {
      return;
    }
    const existing = groups.get(value);
    if (existing) {
      existing.push(doctrine);
    } else {
      groups.set(value, [doctrine]);
    }
  });

  return Array.from(groups.entries())
    .sort(([labelA], [labelB]) => labelA.localeCompare(labelB))
    .map(([label, items]) => ({
      label,
      items: [...items].sort((a, b) => a.title.localeCompare(b.title)),
    }));
}

function DoctrineGroupList({ groups }: { groups: DoctrineGroup[] }): ReactElement {
  return (
    <div className={styles.groups}>
      {groups.map(group => (
        <section key={group.label} className={styles.group}>
          <h3 className={styles.groupTitle}>{group.label}</h3>
          <ul className={styles.list}>
            {group.items.map(item => (
              <li key={item.slug} className={styles.listItem}>
                <Link to={item.slug}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

export default function DoctrinesIndex(): ReactElement | null {
  const data = usePluginData('doctrines-index') as DoctrinesIndexData | undefined;
  const doctrines = data?.doctrines ?? [];

  const stageGroups = React.useMemo(
    () => groupDoctrines(doctrines, 'stage'),
    [doctrines],
  );
  const categoryGroups = React.useMemo(
    () => groupDoctrines(doctrines, 'category'),
    [doctrines],
  );

  if (!doctrines.length) {
    return null;
  }

  return (
    <Tabs defaultValue="stage">
      <TabItem value="stage" label="By stage">
        <DoctrineGroupList groups={stageGroups} />
      </TabItem>
      <TabItem value="category" label="By category">
        <DoctrineGroupList groups={categoryGroups} />
      </TabItem>
    </Tabs>
  );
}
