import React, { useRef, useEffect, useState } from 'react'
import { WebView } from 'react-native-webview'
import { useSelector, useDispatch } from 'react-redux'

import styled from 'styled-components/native'

import { AppState } from 'src/store/reducers'
import { WEBVIEW_REF, URL_INPUT } from 'src/store/navigation.reducer'


const ScrollView = styled.ScrollView.attrs((props) => ({
  contentContainerStyle: {
    flex: 1
  }
}))`
  margin-top: 46px;
`

const RefreshControl = styled.RefreshControl``

const WebViewContainer = styled(WebView)`
`


export default function BrowserWebView() {

  const config = {
    detectorTypes: 'all',
    allowStorage: true,
    allowJavascript: true,
    allowCookies: true,
    allowLocation: true,
    allowCaching: true,
    defaultSearchEngine: 'duck'
  }

  const webViewRef = useRef<WebView>(null)

  const navigation = useSelector((state: AppState) => state.navigation)
  const dispatch = useDispatch()

  const [ refreshing, setRefreshing ] = useState(false)

  useEffect(() => {
    dispatch({ type: WEBVIEW_REF, webViewRef })
  }, [])

  const webViewReload = () => {
    setRefreshing(true)
    navigation.webViewRef.current.reload()
  }


  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={webViewReload} 
          />
        }>
        <WebViewContainer
          ref={webViewRef}
          userAgent="Cartographer v0.1.0; Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X)"
          originWhitelist={['*']}
          source={{ uri: navigation.urlCurrent }}
          onLoadStart={() => { }}
          onNavigationStateChange={(navState) => {
            const url = navState.url
            dispatch({ type: URL_INPUT, urlInput: url })
          }}
          onLoadEnd={() => {
            setRefreshing(false)
          }}
          onContentProcessDidTerminate={syntheticEvent => {
            const { nativeEvent } = syntheticEvent
            console.warn('Content process terminated, reloading', nativeEvent)
            webViewReload()
          }}
          startInLoadingState
          domStorageEnabled={config.allowStorage}
          javaScriptEnabled={config.allowJavascript}
          decelerationRate={0.998}
          allowsInlineMediaPlayback
          allowsBackForwardNavigationGestures
        />
      </ScrollView>
    </>
  )
}