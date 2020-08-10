import React, { useState } from 'react'
import { View } from 'react-native'
import { BlurView } from '@react-native-community/blur'

import { isDarkMode } from 'src/utils/appearance'

import NavigationTextInput from 'src/components/Navigation/NavigationComboInput'
import NavigationButtons from 'src/components/Navigation/NavigationButtons'


export default function Navigation() {

  const [ dimensions, setDimensions ] = useState({
    x: 0 as number, 
    y: 0 as number,
    width: 0 as number, 
    height: 0 as number,
  })

  return (
    <>
    {/*<View 
      onLayout={(event) => {
        const { x, y, width, height } = event.nativeEvent.layout
        console.log('View ', x, y, width, height)
        setDimensions({x, y, width, height})
      }}
      style={{
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0
      }}
    >*/}
      {/* <BlurView
        blurType={isDarkMode() ? 'dark' : 'light'}
        style={{ 
          position: 'absolute',
          bottom: 0,
          right: 0,
          left: 0,
          height: dimensions.height
        }}
      /> */}
      <NavigationTextInput />
      <NavigationButtons />
    {/* </View> */}
    </>
  )
}