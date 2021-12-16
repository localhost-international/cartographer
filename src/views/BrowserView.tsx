import { env } from 'environments/.env';

import React, { useEffect, useRef } from 'react';
import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  // useRecoilValue,
  useRecoilState,
} from 'recoil';

import { tabsState } from 'src/store';
import { newTab } from 'src/utils/tabs';

import Navigation from 'src/components/Navigation';
import BrowserTab from 'src/components/BrowserTab';

// import { developerTemplate } from 'src/data/internal/page-templates/developer.template';


export default function Browser() {
  // const browserTabs = useRecoilValue(tabsState);
  const [browserTabs, setBrowserTabs] = useRecoilState(tabsState);
  const firstLoad = useRef<boolean>(false);

  useEffect(() => {
    if (!firstLoad.current && env.ENVIRONMENT === 'development') {
      // setBrowserTabs(newTab({ html: developerTemplate() }, browserTabs));
      setBrowserTabs(
        newTab({ uri: 'https://metamask.github.io/test-dapp/' }, browserTabs),
      );
      firstLoad.current = true;
    }
  }, [browserTabs, setBrowserTabs]);

  return (
    <>
      <SafeAreaViewContainer>
        {browserTabs.tabs.map((browserTab) => {
          const { tabId } = browserTab;
          return <BrowserTab key={tabId} tabState={browserTab} />;
        })}
      </SafeAreaViewContainer>
      <Navigation />
    </>
  );
}

const SafeAreaViewContainer = styled(SafeAreaView).attrs(() => ({
  edges: ['top'],
}))`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
`;
