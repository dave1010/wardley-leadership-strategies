import React from 'react';
import type {Props} from '@theme/Root';
import OriginalRoot from '@theme-original/Root';
import { SpeedInsights } from '@vercel/speed-insights/react';

export default function Root(props: Props): JSX.Element {
  return (
    <>
      <OriginalRoot {...props} />
      <SpeedInsights />
    </>
  );
}
