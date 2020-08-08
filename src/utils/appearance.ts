import { useState, useEffect } from 'react'
import { Appearance, useColorScheme } from 'react-native-appearance'


Appearance.getColorScheme()


export const isDarkMode = () => {

  const [isDarkMode, setIsDarkMode] = useState(false)

  const colorScheme = useColorScheme()

  // TODO - Unsubscribe on unmount
  useEffect(() => {
    setIsDarkMode(colorScheme === 'dark' ? true : false)
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setIsDarkMode(colorScheme === 'dark' ? true : false)
    })
  }, [isDarkMode])

  return isDarkMode
}