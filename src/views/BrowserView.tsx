import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRecoilValue } from 'recoil';

import { browserTabsState } from 'src/store';

import Navigation from 'src/components/Navigation';
import BrowserTab from 'src/components/BrowserTab';

export default function Browser() {
  const browserTabs = useRecoilValue(browserTabsState);

  // const [localBrowserTabs, setLocalBrowserTabs] = useState<object[]>([]);

  useEffect(() => {
    console.log(Array(10).join('\n'));
    console.log('Browser Tabs', browserTabs, null, 2);
    console.log(Array(10).join('\n'));

    return () => {
      console.log('Browser unmounted!');
    };
  }, [browserTabs, browserTabs.tabs.length]);

  return (
    <>
      <KeyboardAvoidingView enabled behavior="padding">
        <SafeAreaViewContainer>
          {browserTabs.tabs.map((browserTab) => {
            const { tabId } = browserTab;
            return <BrowserTab key={tabId} tabState={browserTab} />;
          })}
        </SafeAreaViewContainer>
        <Navigation />
      </KeyboardAvoidingView>
    </>
  );
}

const SafeAreaViewContainer = styled(SafeAreaView).attrs(() => ({
  edges: ['top'],
}))`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
`;

const KeyboardAvoidingView = styled.KeyboardAvoidingView`
  flex: 1;
`;
