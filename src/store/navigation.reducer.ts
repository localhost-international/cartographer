import type { Dispatch } from 'redux'

export const WEBVIEW_REF = 'browser/webview-ref'
export const WEBVIEW_STATE = 'browser/webview-state'
export const URL_INPUT = 'browser/url-input'
export const URL_CURRENT = 'browser/url-current'


type NavigationState = {
  urlInput: string
  urlCurrent: string
  webViewRef: null
  webViewState: null
}

const initialState: NavigationState = {
  urlInput: '',
  urlCurrent: 'https://web3summit.com/',
  webViewRef: null,
  webViewState: null
}


export default (state: NavigationState = initialState, action: any) => {
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

export const urlInput = (url: string) => (dispatch: Dispatch) => {
  console.log('urlInput dispatch', url)
  dispatch({ type: URL_INPUT, urlInput: url })
}

export const urlCurrent = (url: string) => (dispatch: Dispatch) => {
  console.log('urlCurrent dispatch', url)
  dispatch({ type: URL_CURRENT, urlCurrent: url })
}
