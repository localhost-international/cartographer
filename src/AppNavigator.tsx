import React, { useContext } from 'react'
import { Text, TouchableOpacity, Button, Alert } from 'react-native'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'

import { ThemeContext } from 'styled-components/native'

import Browser from 'src/views/Browser'
import Settings from 'src/views/Settings'


const Stack = createStackNavigator()


export default function AppNavigator() {

  const theme = useContext(ThemeContext)

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Browser"
        screenOptions={{
          cardStyle: {
            backgroundColor: 'transparent'
          },
          cardOverlayEnabled: true,
          cardShadowEnabled: true,
          gestureEnabled: true,
          ...TransitionPresets.ModalPresentationIOS,
          headerStyle: {
            borderBottom: 'none'
          },
        }}
        mode="modal"
        headerMode="screen"
        >
        <Stack.Screen
          name="Browser"
          component={Browser}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}