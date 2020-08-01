import 'styled-components/native'

declare module 'styled-components/native' {
  export interface DefaultTheme {
    colors: {
      text: string
      background: string
      debug: string
    }
  }
}