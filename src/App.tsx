import React from 'react'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components/native'
import { AppearanceProvider } from 'react-native-appearance'

import store from 'src/store/index'

import AppNavigator from 'src/AppNavigator'

import lightTheme from 'src/themes/light'
import darkTheme from 'src/themes/dark'

import { isDarkMode } from 'src/utils/appearance'


export default function App() {
  return (
    <>
      <AppearanceProvider>
        <ThemeProvider theme={isDarkMode() ? darkTheme : lightTheme}>
          <Provider store={store}>
            <AppNavigator />
          </Provider>
        </ThemeProvider>
      </AppearanceProvider>
    </>
  )
}
