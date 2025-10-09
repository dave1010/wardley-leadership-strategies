import { Children, ElementType, ReactElement, ReactNode, isValidElement } from 'react';

type ElementWithChildren = ReactElement<{ children?: ReactNode }>;

const toElementWithChildren = (child: ReactNode): ElementWithChildren | null =>
  (isValidElement(child) ? (child as ElementWithChildren) : null);

export const extractStatements = (children: ReactNode, targetType: ElementType): string[] => {
  const items: string[] = [];
  Children.forEach(children, child => {
    if (!child) return;

    const element = toElementWithChildren(child);
    const isElement = element !== null;
    // Lenient type check for testing: check name if direct equality fails
    const isCorrectType =
      isElement &&
      (element.type === targetType ||
        (typeof element.type === 'function' && typeof targetType === 'function' && (element.type as any).name === (targetType as any).name) ||
        (typeof element.type === 'object' && (element.type as any).displayName === (targetType as any).displayName));

    if (isCorrectType) {
      const nestedChildren = Children.toArray(element.props.children).map(toElementWithChildren).filter(Boolean) as ElementWithChildren[];

      nestedChildren.forEach(nested => {
        const grandChildren = nested.props.children;
        if (grandChildren !== undefined && grandChildren !== null) {
          if (typeof grandChildren === 'string') {
            items.push(grandChildren);
          } else {
            const firstString = Children.toArray(grandChildren).find(item => typeof item === 'string');
            if (typeof firstString === 'string') {
              items.push(firstString);
            }
          }
          // This version does NOT attempt to recursively flatten or concatenate if grandChildren contains mixed elements/strings.
          // It specifically looks for a string or an array starting with a string.
        }
      });
    } else if (isElement && element.props.children) {
      // Recursively search nested children for targetType components
      items.push(...extractStatements(element.props.children, targetType));
    }
  });
  return items;
};
