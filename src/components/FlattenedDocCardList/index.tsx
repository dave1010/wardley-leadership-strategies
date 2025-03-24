import React from 'react';
import clsx from 'clsx';
import {
  filterDocCardListItems,
  useDocsSidebar,
} from '@docusaurus/plugin-content-docs/client';
import DocCard from '@theme/DocCard';
import type {Props} from '@theme/DocCardList';
import {PropSidebarItem, PropSidebarItemLink, PropSidebarItemCategory} from '@docusaurus/plugin-content-docs';
import {useLocation} from '@docusaurus/router';
import {isSamePath} from '@docusaurus/theme-common/internal';
import StrategyDocCard from '@site/src/components/StrategyDocCard';


import type {
    PropSidebar,
    PropSidebarBreadcrumbsItem,
  } from '@docusaurus/plugin-content-docs';

function flattenSidebarItems(items: PropSidebarItem[], depth): PropSidebarItemLink[] {
  return items.flatMap((item) => {
    if (item.type === 'category' && depth > 0) {
      return flattenSidebarItems(item.items, depth - 1);
    }
    if (item.type === 'link') {
      return [item];
    }

    // if its a category but depth is 0, we pretend the category is a link
    if (item.type === 'category') {
      return [item as PropSidebarItemLink];
    }
    return []; // Shouldn't happen in Docusaurus sidebar, but safe default
  });
}

/**
 * Get the sidebar the breadcrumbs for a given pathname
 * Ordered from top to bottom
 */
function getSidebarBreadcrumbs({
    sidebarItems,
    pathname,
    onlyCategories = false,
  }: {
    sidebarItems: PropSidebar;
    pathname: string;
    onlyCategories?: boolean;
  }): PropSidebarBreadcrumbsItem[] {
    const breadcrumbs: PropSidebarBreadcrumbsItem[] = [];
  
    function extract(items: PropSidebarItem[]) {
      for (const item of items) {
        if (
          (item.type === 'category' &&
            (isSamePath(item.href, pathname) || extract(item.items))) ||
          (item.type === 'link' && isSamePath(item.href, pathname))
        ) {
          const filtered = onlyCategories && item.type !== 'category';
          if (!filtered) {
            breadcrumbs.unshift(item);
          }
          return true;
        }
      }
  
      return false;
    }
  
    extract(sidebarItems);
  
    return breadcrumbs;
  }

function getAllSubPagesFromDeepestCategory(): PropSidebarItemLink[] {
    const {pathname} = useLocation();
    const sidebar = useDocsSidebar();
    if (!sidebar) {
      throw new Error('Unexpected: cant find current sidebar');
    }
  
    const categoryBreadcrumbs = getSidebarBreadcrumbs({
      sidebarItems: sidebar.items,
      pathname,
      onlyCategories: true,
    });
  
    const deepestCategory = categoryBreadcrumbs.slice(-1)[0];
    const targetItems = deepestCategory?.items ?? sidebar.items;
    const depth = 1;

    const items = flattenSidebarItems(targetItems, depth);

    // sort by label
    items.sort((a, b) => a.label.localeCompare(b.label));
    return items
  }



function DocCardListForCurrentSidebarCategory({className}: Props) {
  const items = getAllSubPagesFromDeepestCategory();
  return <FlattenedDocCardList items={items} className={className} />;
}

export default function FlattenedDocCardList(props: Props): JSX.Element {
  const {items, className} = props;
  if (!items) {
    return <DocCardListForCurrentSidebarCategory {...props} />;
  }
  const filteredItems = filterDocCardListItems(items);
  return (
    <section className={clsx('row', className)}>
      {filteredItems.map((item, index) => (
        <article key={index} className="col col--6 margin-bottom--lg">
          <DocCard item={item} />
        </article>
      ))}
    </section>
  );
}