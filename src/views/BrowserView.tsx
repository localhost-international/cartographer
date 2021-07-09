import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import { useRecoilValue } from 'recoil';

import { browserTabsState } from 'src/store';

import Navigation from 'src/components/Navigation';
import BrowserTab from 'src/components/BrowserTab';

/**
 * TODO
 * - Send WebView ref to Navigation instance
 */

export default function Browser() {
  const browserTabs = useRecoilValue(browserTabsState);

  useEffect(() => {
    console.log('Open Browser Tabs', browserTabs.tabs.length);
  }, [browserTabs.tabs.length]);

  useEffect(() => {
    console.log(
      'Active and Previous Tab IDs',
      browserTabs.activeTabId,
      browserTabs.previousTabId,
    );
    console.log('New tab', browserTabs.tabs[browserTabs.tabs.length - 1]);
  }, [browserTabs]);

  return (
    <>
      <KeyboardAvoidingView enabled behavior="padding">
        <View>
          {browserTabs.tabs.map((browserTab) => {
            const { tabMounted, tabId, tabActive } = browserTab;
            return tabMounted ? (
              <BrowserTab
                key={tabId}
                config={browserTab}
                style={{ display: tabActive ? 'block' : 'none' }}
              />
            ) : null;
          })}
          <Navigation />
        </View>
      </KeyboardAvoidingView>
    </>
  );
}

const View = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
`;
const KeyboardAvoidingView = styled.KeyboardAvoidingView`
  flex: 1;
`;
