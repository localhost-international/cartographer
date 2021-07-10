import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRecoilState } from 'recoil';
import { WebView } from 'react-native-webview';
import styled from 'styled-components/native';

import { browserTabsState } from 'src/store';
import type { BrowserTabState } from 'src/store';

interface BrowserTabProps {
  tabState: BrowserTabState;
}

export default function BrowserTab({ tabState }: BrowserTabProps) {
  const [browserTabs, setBrowserTabs] = useRecoilState(browserTabsState);

  const [refreshing, setRefreshing] = useState(false);

  // Do I need this?
  const { tabRef } = tabState;

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

  useEffect(() => {
    // console.log('\n\ntabUriCurrent', tabUriCurrent);
  }, [browserTabs]);

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={webViewReload} />
        }>
        <SafeAreaViewContainer>
          {browserTabs.activeTabIndex !== null && (
            <WebViewContainer
              ref={tabRef}
              userAgent="Cartographer v0.1.0; Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X)"
              originWhitelist={['*']}
              // source={tabUriCurrent}
              source={
                browserTabs.tabs[browserTabs.activeTabIndex].tabUriCurrent
              }
              onLoadStart={() => {}}
              onNavigationStateChange={(currentNavState) => {
                // console.log('onNavigationStateChange', currentNavState);

                setBrowserTabs((previous) => {
                  // console.log('\nonNavigationStateChange', previous);
                  if (previous.activeTabIndex !== null) {
                    previous.tabs[previous.activeTabIndex].tabUriValue =
                      currentNavState.url;
                    previous.tabs[previous.activeTabIndex].tabUri =
                      currentNavState.url;
                    previous.tabs[previous.activeTabIndex].tabTitle =
                      currentNavState.title;
                  }
                  return {
                    ...previous,
                  };
                });
              }}
              onLoadEnd={() => {
                setRefreshing(false);
              }}
              onContentProcessDidTerminate={(syntheticEvent) => {
                const { nativeEvent } = syntheticEvent;
                console.warn(
                  'Content process terminated, reloading',
                  nativeEvent,
                );
                // TODO - Show message in UI that the webview crashed
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
          )}
        </SafeAreaViewContainer>
      </ScrollView>
    </>
  );
}

const ScrollView = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    flex: 1,
  },
}))`
  background: ${(props) => props.theme.colors.background};
`;

const RefreshControl = styled.RefreshControl``;

const SafeAreaViewContainer = styled(SafeAreaView).attrs(() => ({
  // edges: ['right', 'left'],
}))`
  flex: 1;
`;

const WebViewContainer = styled(WebView)`
  /* flex: 1; */
`;
