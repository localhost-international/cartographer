import React, { useRef, useEffect } from 'react'
import { Text } from 'react-native'
import { WebView } from 'react-native-webview'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components/native'

import { AppState } from 'src/store/reducers'
import { WEBVIEW_REF } from 'src/store/navigation.actions'


const WebViewContainer = styled(WebView)`
`


export default function BrowserWebView() {

  const webViewRef = useRef<WebView>(null)

  useEffect(() => {
    dispatch({ type: WEBVIEW_REF, webViewRef })
  }, [])

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
      ref={webViewRef}
      userAgent="Cartographer v0.1.0; Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X)"
      originWhitelist={['*']}
      source={{ uri: navigation.urlCurrent }}
      onLoadStart={() => { }}
      startInLoadingState
      domStorageEnabled={config.allowStorage}
      javaScriptEnabled={config.allowJavascript}
      decelerationRate={0.998}
      allowsInlineMediaPlayback
      allowsBackForwardNavigationGestures
    />
  )
}