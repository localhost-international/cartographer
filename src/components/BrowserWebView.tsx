import React from 'react'
import { WebView } from 'react-native-webview'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components/native'

import { AppState } from 'src/store/reducers'


const WebViewContainer = styled(WebView)`
`


export default function BrowserWebView() {

  const navigation = useSelector((state: AppState) => state.navigation)
  const dispatch = useDispatch()

  const config = {
    detectorTypes: 'all',
    allowStorage: true,
    allowJavascript: true,
    allowCookies: true,
    allowLocation: true,
    allowCaching: true,
    defaultSearchEngine: 'duck'
  }

  return (
    <WebView
      userAgent="Cartographer v0.1.0; Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X)"
      originWhitelist={['*']}
      source={{ uri: navigation.urlCurrent }}
      onLoadStart={() => { }}
      startInLoadingState
      domStorageEnabled={config.allowStorage}
      javaScriptEnabled={config.allowJavascript}
      decelerationRate={0.998}
      allowsInlineMediaPlayback={true}
    />
  );
};