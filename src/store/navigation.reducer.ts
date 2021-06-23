import type React from 'react'
import type { WebView } from 'react-native-webview'
import type { Dispatch } from 'redux'

export const WEBVIEW_REF = 'browser/webview-ref'
export const WEBVIEW_STATE = 'browser/webview-state'
export const URL_INPUT = 'browser/url-input'
export const URL_CURRENT = 'browser/url-current'


type NavigationState = {
  urlInput: string
  urlCurrent: string
  webViewRef: React.RefObject<WebView> | null
  webViewState: null
}

const initialState: NavigationState = {
  urlInput: '',
  urlCurrent: 'https://foundation.app/@leslie',
  webViewRef: null,
  webViewState: null
}


type UrlInput = {
	type: typeof URL_INPUT
	urlInput: string
}
type UrlCurrent = {
	type: typeof URL_CURRENT
	urlCurrent: string
}
type WebViewRef = {
	type: typeof WEBVIEW_REF
	webViewRef: React.RefObject<WebView> | null
}
type WebViewState = {
	type: typeof WEBVIEW_STATE
	webViewState: null
}

type NavigationActionTypes = 
	UrlInput | 
	UrlCurrent | 
	WebViewRef | 
	WebViewState

export default (
	state: NavigationState = initialState, action: NavigationActionTypes) => {
  switch (action.type) {
    case WEBVIEW_REF: {
      return {
        ...state,
        webViewRef: action.webViewRef
      }
    }
    case WEBVIEW_STATE: {
      return {
        ...state,
        webViewState: action.webViewState
      }
    }
    case URL_INPUT: {
      return {
        ...state,
        urlInput: action.urlInput
      }
    }
    case URL_CURRENT: {
      return {
        ...state,
        urlCurrent: action.urlCurrent
      }
    }
    default: {
      return { ...state }
    }
  }
}

export const webViewRef = (ref: any) => (dispatch: Dispatch) => {
  console.log('webViewRef dispatch', ref)
  dispatch({ type: WEBVIEW_REF, webViewRef: ref })
}

export const urlInput = (url: string) => (dispatch: Dispatch) => {
  console.log('urlInput dispatch', url)
  dispatch({ type: URL_INPUT, urlInput: url })
}

export const urlCurrent = (url: string) => (dispatch: Dispatch) => {
  console.log('urlCurrent dispatch', url)
  dispatch({ type: URL_CURRENT, urlCurrent: url })
}
