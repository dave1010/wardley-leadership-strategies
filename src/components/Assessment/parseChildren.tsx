import { Children, ReactNode, isValidElement } from 'react';

export const extractStatements = (children: ReactNode, targetType: any): string[] => {
  const items: string[] = [];
  Children.forEach(children, child => {
    if (!child) return;

    const isElement = isValidElement(child);
    // Lenient type check for testing: check name if direct equality fails
    const isCorrectType =
      isElement &&
      (child.type === targetType ||
        (typeof child.type === 'function' && typeof targetType === 'function' && (child.type as any).name === (targetType as any).name) ||
        (typeof child.type === 'object' && (child.type as any).displayName === (targetType as any).displayName));

    if (isCorrectType) {
      const intermediateChildren = child.props.children;
      const nestedChildren = Array.isArray(intermediateChildren) ? intermediateChildren : [intermediateChildren];

      nestedChildren.filter(Boolean).forEach(c => {
        if (isValidElement(c) && c.props && c.props.children !== undefined && c.props.children !== null) {
          // Attempt to handle if c.props.children is the string itself or an array with the string
          const grandChildren = c.props.children;
          if (typeof grandChildren === 'string') {
            items.push(grandChildren);
          } else if (Array.isArray(grandChildren) && grandChildren.length > 0 && typeof grandChildren[0] === 'string') {
            // If it's an array, and the first item is a string, take it.
            // This handles cases like <Wrapper>{['Text']}</Wrapper> or <Wrapper>{['Text', <OtherElement/>]}</Wrapper> (takes 'Text')
            items.push(grandChildren[0]);
          }
          // This version does NOT attempt to recursively flatten or concatenate if grandChildren contains mixed elements/strings.
          // It specifically looks for a string or an array starting with a string.
        }
      });
    } else if (isElement && child.props && child.props.children) {
      // Recursively search nested children for targetType components
      items.push(...extractStatements(child.props.children, targetType));
    }
  });
  return items;
};
