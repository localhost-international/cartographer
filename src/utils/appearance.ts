import { useState, useEffect } from 'react'
import { Appearance, useColorScheme } from 'react-native-appearance'


Appearance.getColorScheme()


export const isDarkMode = () => {

  const [isDarkMode, setIsDarkMode] = useState(false)

  const colorScheme = useColorScheme()

	useEffect(() => {
		let mounted = true;
		setIsDarkMode(colorScheme === 'dark' ? true : false)
		Appearance.addChangeListener(({ colorScheme }) => {
			if (mounted) {
				setIsDarkMode(colorScheme === 'dark' ? true : false)
			}
		})
    return () => {
      mounted = false;
    }		
  }, [isDarkMode])


  return isDarkMode
}