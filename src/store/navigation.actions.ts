export const WEBVIEW_REF = 'browser/webview-ref'
export const URL_INPUT = 'browser/url-input'
export const URL_CURRENT = 'browser/url-current'

type BrowserState = {
  urlInput: string
  urlCurrent: string
  webViewRef: any
}

const initialState: BrowserState = {
  urlInput: 'https://duck.com/',
  urlCurrent: 'https://duck.com/',
  webViewRef: null
}

export default (state: BrowserState = initialState, action: any) => {
  // console.log('ACTION', action)
  switch (action.type) {
    case WEBVIEW_REF: {
      return {
        ...state,
        webViewRef: action.webViewRef
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

export const urlInput = () => (dispatch: any) => {
  dispatch({ type: URL_INPUT })
}

export const urlCurrent = () => (dispatch: any) => {
  dispatch({ type: URL_CURRENT })
}
