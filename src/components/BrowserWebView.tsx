import React, { useRef, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { WebView } from 'react-native-webview';
import { navigationState } from 'src/store/atoms';
import styled from 'styled-components/native';

export default function BrowserWebView() {
  const config = {
    detectorTypes: 'all',
    allowStorage: true,
    allowJavascript: true,
    allowCookies: true,
    allowLocation: true,
    allowCaching: true,
    defaultSearchEngine: 'duck',
  };

  const webViewRef = useRef<WebView | null>(null);

  const [refreshing, setRefreshing] = useState(false);

  const [navState, setNavState] = useRecoilState(navigationState);

  useEffect(() => {
    setNavState((previous) => {
      return {
        ...previous,
        webViewRef: webViewRef,
      };
    });
  });

  const webViewReload = () => {
    setRefreshing(true);
    if (navState.webViewRef) {
      navState.webViewRef.current?.reload();
    }
  };

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={webViewReload} />
        }>
        <SafeAreaView>
          <WebViewContainer
            ref={webViewRef}
            userAgent="Cartographer v0.1.0; Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X)"
            originWhitelist={['*']}
            source={{ uri: navState.urlCurrent }}
            onLoadStart={() => {}}
            onNavigationStateChange={(currentNavState) => {
              console.log('onNavigationStateChange', currentNavState);
              setNavState((previous) => {
                return {
                  ...previous,
                  urlInput: currentNavState.url,
                  webViewState: currentNavState,
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
        </SafeAreaView>
      </ScrollView>
    </>
  );
}

const ScrollView = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    flex: 1,
  },
}))`
  /* Note: experiment with dynamic container heights
  /*margin-top: 46px;*/
  /*margin-bottom: 134px;*/
`;

const RefreshControl = styled.RefreshControl``;

const SafeAreaView = styled.SafeAreaView`
  flex: 1;
`;

const WebViewContainer = styled(WebView)``;
