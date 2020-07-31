import React, { useState, useEffect } from 'react'
import { Text, TouchableOpacity } from 'react-native'

import { Provider } from 'react-redux'
import styled, { ThemeProvider } from 'styled-components/native'

import { AppearanceProvider, Appearance, useColorScheme } from 'react-native-appearance'

import store from 'src/store/index'

import AppNavigator from 'src/AppNavigator'

import lightTheme from 'src/themes/light'
import darkTheme from 'src/themes/dark'



Appearance.getColorScheme()



export default function App() {

  const [isDarkMode, setIsDarkMode] = useState(false)

  const colorScheme = useColorScheme()


  useEffect(() => {
    setIsDarkMode(colorScheme === 'dark' ? true : false)
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setIsDarkMode(colorScheme === 'dark' ? true : false)
    })
  }, [isDarkMode])


  return (
    <>
      <AppearanceProvider>
        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
          <Provider store={store}>
            <AppNavigator />
          </Provider>
        </ThemeProvider>
      </AppearanceProvider>
    </>
  )
}
