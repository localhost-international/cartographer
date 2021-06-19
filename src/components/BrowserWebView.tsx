import React, { useRef, useEffect, useState } from 'react'
import { WebView } from 'react-native-webview'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components/native'

import { AppState } from 'src/store/reducers'
import { 
  WEBVIEW_REF,
  WEBVIEW_STATE, 
  URL_INPUT
} from 'src/store/navigation.reducer'



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
    dispatch({ type: WEBVIEW_REF, webViewRef });
  }, []);

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
        <SafeAreaView>
          <WebViewContainer
            ref={webViewRef}
            userAgent="Cartographer v0.1.0; Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X)"
            originWhitelist={['*']}
            source={{ uri: navigation.urlCurrent }}
            onLoadStart={() => { }}
            onNavigationStateChange={(navState: { url: string }) => {
              console.log('onNavigationStateChange', navState)
              dispatch({ type: URL_INPUT, urlInput: navState.url })
              dispatch({ type: WEBVIEW_STATE, webViewState: navState })
            }}
            onLoadEnd={() => {
              setRefreshing(false)
            }}
            onContentProcessDidTerminate={(syntheticEvent) => {
              const { nativeEvent } = syntheticEvent
              console.warn('Content process terminated, reloading', nativeEvent)
              // TODO - Show message in UI that the webview crashed 
              webViewReload()
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
  )
}



const ScrollView = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    flex: 1,
  }
}))`
  /* Note: experiment with dynamic container heights
  /*margin-top: 46px;*/
  /*margin-bottom: 134px;*/
`

const RefreshControl = styled.RefreshControl``

const SafeAreaView = styled.SafeAreaView`
  flex: 1;
`

const WebViewContainer = styled(WebView)``

const Text = styled.Text`
  color: ${props => props.theme.colors.text};
`
