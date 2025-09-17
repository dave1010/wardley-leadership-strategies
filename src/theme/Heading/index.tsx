/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import {translate} from '@docusaurus/Translate';
import {useThemeConfig} from '@docusaurus/theme-common';
import Link from '@docusaurus/Link';
import useBrokenLinks from '@docusaurus/useBrokenLinks';
import type {Props} from '@theme/Heading';

import styles from './styles.module.css';
import {LeadershipFocusPills} from '@site/src/components/StrategyMetadata';

function shouldShowLeadershipFocus(as: Props['as'], id?: string): boolean {
  return as === 'h2' && id === 'leadership';
}

export default function Heading({as: As, id, ...props}: Props): ReactNode {
  const brokenLinks = useBrokenLinks();
  const {
    navbar: {hideOnScroll},
  } = useThemeConfig();

  if (As === 'h1' || !id) {
    const heading = <As {...props} id={undefined} />;
    return shouldShowLeadershipFocus(As, id) ? (
      <>
        {heading}
        <LeadershipFocusPills />
      </>
    ) : (
      heading
    );
  }

  brokenLinks.collectAnchor(id);

  const anchorTitle = translate(
    {
      id: 'theme.common.headingLinkTitle',
      message: 'Direct link to {heading}',
      description: 'Title for link to heading',
    },
    {
      heading: typeof props.children === 'string' ? props.children : id,
    },
  );

  const heading = (
    <As
      {...props}
      className={clsx(
        'anchor',
        hideOnScroll
          ? styles.anchorWithHideOnScrollNavbar
          : styles.anchorWithStickyNavbar,
        props.className,
      )}
      id={id}>
      {props.children}
      <Link
        className="hash-link"
        to={`#${id}`}
        aria-label={anchorTitle}
        title={anchorTitle}>
        &#8203;
      </Link>
    </As>
  );

  return shouldShowLeadershipFocus(As, id) ? (
    <>
      {heading}
      <LeadershipFocusPills />
    </>
  ) : (
    heading
  );
}
