import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRecoilState } from 'recoil';
import { WebView } from 'react-native-webview';
import styled from 'styled-components/native';

import { tabsState } from 'src/store';
import type { TabState } from 'src/store';

interface BrowserTabProps {
  tabState: TabState;
}

export default function BrowserTab({ tabState }: BrowserTabProps) {
  const [browserTabs, setBrowserTabs] = useRecoilState(tabsState);
  const [refreshing, setRefreshing] = useState(false);

  const { tabRef, tabId, tabActive, tabUriCurrent } = tabState;

  const tabIndex = browserTabs.tabs.findIndex((tab) => tab.tabId === tabId);

  const config = {
    detectorTypes: 'all',
    allowStorage: true,
    allowJavascript: true,
    allowCookies: true,
    allowLocation: true,
    allowCaching: true,
    defaultSearchEngine: 'duck',
  };

  const webViewReload = () => {
    setRefreshing(true);
    if (tabRef) {
      tabRef.current?.reload();
    }
  };

  return (
    <>
      <BrowserTabContainer active={tabActive}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={webViewReload} />
          }>
          <SafeAreaViewContainer>
            <WebViewContainer
              ref={tabRef}
              userAgent="Cartographer v0.1.0; Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X)"
              applicationNameForUserAgent="Cartographer"
              originWhitelist={['*']}
              source={tabUriCurrent}
              onLoadStart={() => {}}
              onNavigationStateChange={(navState) => {
                const currentNavState = navState;
                setBrowserTabs((previous) => {
                  previous.tabs[tabIndex].tabUriValue = currentNavState.url;
                  previous.tabs[tabIndex].tabTitle = currentNavState.title;
                  return {
                    ...previous,
                  };
                });
              }}
              onLoadEnd={() => {
                setRefreshing(false);
              }}
              onContentProcessDidTerminate={(syntheticEvent) => {
                // TODO - Show message in UI that the webview crashed
                const { nativeEvent } = syntheticEvent;
                console.warn(
                  'Content process terminated, reloading',
                  nativeEvent,
                );
                webViewReload();
              }}
              startInLoadingState
              domStorageEnabled={config.allowStorage}
              javaScriptEnabled={config.allowJavascript}
              decelerationRate={0.998}
              allowsBackForwardNavigationGestures
              allowsInlineMediaPlayback={true}
              allowsFullscreenVideo={false}
            />
          </SafeAreaViewContainer>
        </ScrollView>
      </BrowserTabContainer>
    </>
  );
}

interface BrowserTabContainerProps {
  active: boolean;
}

const BrowserTabContainer = styled.View<BrowserTabContainerProps>`
  display: ${(props) => (props.active ? 'flex' : 'none')};
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const ScrollView = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    flex: 1,
  },
}))`
  background: ${(props) => props.theme.colors.background};
`;

const RefreshControl = styled.RefreshControl``;

const SafeAreaViewContainer = styled(SafeAreaView).attrs(() => ({
  edges: ['top', 'right', 'left'],
}))`
  flex: 1;
`;

const WebViewContainer = styled(WebView)`
  flex: 1;
`;
