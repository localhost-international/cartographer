export const URL_INPUT = 'navigation/url-input'
export const URL_CURRENT = 'navigation/url-current'

type NavigationState = {
  urlInput: string
  urlCurrent: string
}

const initialState: NavigationState = {
  urlInput: 'https://duck.com/',
  urlCurrent: 'https://duck.com/'
}

export default (state: NavigationState = initialState, action: any) => {
  console.log('ACTION', action)
  switch (action.type) {
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
