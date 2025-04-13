import { Children, ReactNode } from 'react';

export const extractStatements = (children: ReactNode, targetType: any): string[] => {
  const items: string[] = [];
  Children.forEach(children, child => {
    if (!child || typeof child !== 'object') return;
    if ((child as any).type === targetType) {
      const nested = (Array.isArray((child as any).props.children)
        ? (child as any).props.children
        : [(child as any).props.children]
      ).filter(Boolean);
      nested.forEach(c => items.push((c as any).props.children));
    }
  });
  return items;
};
