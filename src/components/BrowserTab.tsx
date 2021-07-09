import React from 'react';

import BrowserWebView from 'src/components/BrowserWebView';

import type { BrowserTabState } from 'src/store';

interface BrowserTabProps {
  config: BrowserTabState;
  style: React.CSSProperties;
}

export default function BrowserTab({ config }: BrowserTabProps) {
  const { tabRef, tabIndex, tabMounted, tabId, tabTitle, tabUri } = config;

  console.log('Debug', tabRef, tabIndex, tabMounted, tabId, tabTitle, tabUri);

  return (
    <>
      <BrowserWebView />
    </>
  );
}
