import 'styled-components/native'

declare module 'styled-components/native' {
  export interface DefaultTheme {
    colors: {
      scheme: string
      text: string
      background: string
      debug: string
    },
    ui: {
      background: string
			foreground: string
      icon: string
    },
    addressBar: {
      background: string
      color: string
    }
  }
}