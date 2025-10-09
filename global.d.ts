/// <reference types="jest" />
/// <reference types="@testing-library/jest-dom" />

import '@testing-library/jest-dom';
import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';

declare global {
  namespace jest {
    interface Matchers<R = unknown, T = unknown> extends TestingLibraryMatchers<T, R> {}
    interface Expect extends TestingLibraryMatchers<unknown, unknown> {}
  }
}

declare module 'expect' {
  interface Matchers<R = unknown, T = unknown> extends TestingLibraryMatchers<T, R> {}
}
