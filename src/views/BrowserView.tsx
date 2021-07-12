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
    console.log('\n\n\n\n\n\n\n\n\n\n');

    console.log('\nbrowserTabs.tabs.length:', browserTabs.tabs.length);

    console.log(
      '\nactiveTabId and previousTabId:',
      browserTabs.activeTabId,
      browserTabs.previousTabId,
    );

    console.log('\n\n\n\n\n\n\n\n\n\n');
  }, [browserTabs]);

  return (
    <>
      <KeyboardAvoidingView enabled behavior="padding">
        <View>
          {browserTabs.tabs.map((browserTab) => {
            const { tabId } = browserTab;
            return <BrowserTab key={tabId} tabState={browserTab} />;
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
