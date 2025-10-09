import React, { ReactNode } from 'react';
import { describe, it } from '@jest/globals';
import { extractStatements } from './parseChildren';

// Define simple React components for testing
// Using React.createElement to define test components
const TargetTypeComponent = ({ children }) => React.createElement(React.Fragment, null, children);
const WrapperComponent = ({ children }) => React.createElement(React.Fragment, null, children);
const OtherComponent = ({ children }) => React.createElement('div', null, children); // This will be ignored by type

describe('extractStatements', () => {
  // Test 1: Basic Extraction
  it('should extract string children of TargetTypeComponent instances', () => {
    const children = React.createElement(React.Fragment, null,
      React.createElement(TargetTypeComponent, null,
        React.createElement(WrapperComponent, null, "Statement 1")
      ),
      React.createElement(OtherComponent, null, "Ignored"),
      React.createElement(TargetTypeComponent, null,
        React.createElement(WrapperComponent, null, "Statement 2"),
        React.createElement(WrapperComponent, null, "Statement 3")
      )
    );
    const statements = extractStatements(children, TargetTypeComponent);
    expect(statements).toEqual(['Statement 1', 'Statement 2', 'Statement 3']);
  });

  // Test 2: No Matching Type
  it('should return an empty array if no TargetTypeComponent instances are present', () => {
    const children = React.createElement(React.Fragment, null,
      React.createElement(OtherComponent, null, "Other text 1"),
      React.createElement(OtherComponent, null, "Other text 2")
    );
    const statements = extractStatements(children, TargetTypeComponent);
    expect(statements).toEqual([]);
  });

  // Test 3: Empty or Invalid Children
  describe('handling empty or invalid children input', () => {
    it('should return an empty array for null children', () => {
      expect(extractStatements(null, TargetTypeComponent)).toEqual([]);
    });

    it('should return an empty array for undefined children', () => {
      expect(extractStatements(undefined, TargetTypeComponent)).toEqual([]);
    });

    it('should return an empty array for an empty array of children', () => {
      expect(extractStatements([], TargetTypeComponent)).toEqual([]);
    });

    it('should return an empty array for children of non-object types (e.g. string)', () => {
      // Note: React.Children.forEach handles single string/number children gracefully.
      // The function's internal check `!child || typeof child !== 'object'` is key here.
      expect(extractStatements('Just a string', TargetTypeComponent)).toEqual([]);
      expect(extractStatements(123, TargetTypeComponent)).toEqual([]);
    });
     it('should return an empty array when children are boolean', () => {
      expect(extractStatements(true as any, TargetTypeComponent)).toEqual([]);
      expect(extractStatements(false as any, TargetTypeComponent)).toEqual([]);
    });
  });

  // Test 4: Nested Children within TargetType (as per current implementation)
  // The function expects <Target><Wrapper>text</Wrapper></Target>
  it('should extract text from grandchildren when TargetType children are wrappers', () => {
    const children = React.createElement(TargetTypeComponent, null,
      React.createElement(WrapperComponent, null, "Nested Statement A"),
      React.createElement(WrapperComponent, null, "Nested Statement B")
    );
    const statements = extractStatements(children, TargetTypeComponent);
    expect(statements).toEqual(['Nested Statement A', 'Nested Statement B']);
  });

  it('should handle TargetType with no wrapper children for text', () => {
    const children = React.createElement(TargetTypeComponent, null, "Direct Text");
    // With the new parseChildren, this should not throw but return an empty array
    // because "Direct Text" is not a valid element for `c`.
    expect(extractStatements(children, TargetTypeComponent)).toEqual([]);
  });

  it('should handle TargetType with mixed valid and invalid direct children', () => {
    const children = React.createElement(TargetTypeComponent, null,
      React.createElement(WrapperComponent, null, "Valid Statement"),
      "TextNodeAsDirectChildShouldBeIgnoredByCurrentLogicOrErrorIfProcessedAsElement",
      null,
      React.createElement(WrapperComponent, null, "Another Valid Statement")
    );
    // With the new parseChildren, the string node will be skipped by `isValidElement(c)`.
    expect(extractStatements(children, TargetTypeComponent)).toEqual(['Valid Statement', 'Another Valid Statement']);
  });


  // Test 5: Mixed Child Types
  it('should extract statements correctly from mixed children types', () => {
    const children = React.createElement(React.Fragment, null,
      React.createElement(OtherComponent, null, "Some other content"),
      React.createElement(TargetTypeComponent, null,
        React.createElement(WrapperComponent, null, "Statement Alpha")
      ),
      "Just a string node",
      12345,
      React.createElement(TargetTypeComponent, null,
        React.createElement(WrapperComponent, null, "Statement Beta")
      ),
      React.createElement(OtherComponent, null, "More other content")
    );
    const statements = extractStatements(children, TargetTypeComponent);
    expect(statements).toEqual(['Statement Alpha', 'Statement Beta']);
  });

  it('should handle TargetType children that are not React elements gracefully (or as per defined behavior)', () => {
    const children = React.createElement(TargetTypeComponent, null, "string child of TargetType");
    // With the new parseChildren, this string child ('c') will be skipped by `isValidElement(c)`.
    expect(extractStatements(children, TargetTypeComponent)).toEqual([]);
  });

  it('should handle multiple TargetType components with varied internal structures', () => {
    const children = React.createElement(React.Fragment, null,
      React.createElement(TargetTypeComponent, null,
        React.createElement(WrapperComponent, null, "First")
      ),
      React.createElement(TargetTypeComponent, null, null), // Child of TargetType is null
      React.createElement(TargetTypeComponent, null, // Child of TargetType is undefined (no children prop)
      ),
      React.createElement(TargetTypeComponent, null,
        React.createElement(WrapperComponent, null, "Third"),
        React.createElement(WrapperComponent, null, "Fourth")
      )
    );
    const statements = extractStatements(children, TargetTypeComponent);
    // The middle TargetTypeComponent with null child or undefined children will result in `nestedChildren.filter(Boolean)` being empty.
    expect(statements).toEqual(['First', 'Third', 'Fourth']);
  });

   it('should correctly handle cases where TargetTypeComponent has no children', () => {
    const children = React.createElement(TargetTypeComponent, null);
    const statements = extractStatements(children, TargetTypeComponent);
    expect(statements).toEqual([]);
  });

  it('should handle TargetTypeComponent with null child', () => {
    const children = React.createElement(TargetTypeComponent, null, null);
    const statements = extractStatements(children, TargetTypeComponent);
    expect(statements).toEqual([]);
  });

  it('should handle TargetTypeComponent with multiple children, some null or not elements', () => {
    const children = React.createElement(TargetTypeComponent, null,
      React.createElement(WrapperComponent, null, "Statement X"),
      null,
      "Raw string"
    );
    // "Raw string" will be skipped by `isValidElement(c)`.
    expect(extractStatements(children, TargetTypeComponent)).toEqual(["Statement X"]);

    const childrenValidWrappers = React.createElement(TargetTypeComponent, null,
      React.createElement(WrapperComponent, null, "Statement Y"),
      null,
      React.createElement(WrapperComponent, null, "Statement Z")
    );
    const statements = extractStatements(childrenValidWrappers, TargetTypeComponent);
    expect(statements).toEqual(["Statement Y", "Statement Z"]);
  });
});
