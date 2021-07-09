import React from 'react';

import BrowserWebView from 'src/components/BrowserWebView';

import type { BrowserTabState } from 'src/store';

interface BrowserTabProps {
  config: BrowserTabState;
}

export default function BrowserTab({ config }: BrowserTabProps) {
  const { tabRef, tabIndex, tabActive, tabMounted, tabId, tabTitle, tabUri } =
    config;

  console.log(
    'Debug',
    tabRef,
    tabIndex,
    tabActive,
    tabMounted,
    tabId,
    tabTitle,
    tabUri,
  );

  return (
    <>
      <BrowserWebView />
    </>
  );
}
