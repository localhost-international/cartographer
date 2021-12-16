import React, { useState } from 'react';
import type { ReactElement } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRecoilValue, useRecoilState } from 'recoil';
import { WebView } from 'react-native-webview';
import styled from 'styled-components/native';

import { browserInitialConfig, tabsState } from 'src/store';
import type { TabState } from 'src/store';

import { injectedJS } from 'src/utils/injected/debug.injected';

interface BrowserTabProps {
  tabState: TabState;
}


export default function BrowserTab({
  tabState,
}: BrowserTabProps): ReactElement {
  const [browserTabs, setBrowserTabs] = useRecoilState(tabsState);
  const { userAgent } = useRecoilValue(browserInitialConfig);
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
    if (tabRef) tabRef.current?.reload();
  };

  const onMessage = (payload: { nativeEvent: { data: string } }) => {
    console.log('onMessage', JSON.parse(payload.nativeEvent.data));
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
              // TODO - "Compatibility" mode, removing Cartographer userAgent
              userAgent={userAgent}
              applicationNameForUserAgent="Cartographer"
              originWhitelist={['*']}
              source={tabUriCurrent}
              onFileDownload={(syntheticEvent) => {
                const { nativeEvent } = syntheticEvent;
                console.log('onFileDownload', nativeEvent);
              }}
              onLoadStart={(event) => {
                const { nativeEvent } = event;
                console.log('onLoadStart', nativeEvent.url);
              }}
              onNavigationStateChange={(navState) => {
                const currentNavState = navState;
                console.log('onNavigationStateChange', navState);
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
              domStorageEnabled={config.allowStorage}
              javaScriptEnabled={config.allowJavascript}
              decelerationRate={0.998}
              allowsBackForwardNavigationGestures
              allowsInlineMediaPlayback={true}
              allowsFullscreenVideo={true}
              injectedJavaScript={injectedJS}
              onMessage={onMessage}
              // injectedJavaScriptBeforeContentLoaded={injectedJS}
              // onMessage={() => { }}
              automaticallyAdjustContentInsets={true}
              automaticallyAdjustsScrollIndicatorInsets={true}
              startInLoadingState={true}
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
  /* background-color: transparent; */
`;
