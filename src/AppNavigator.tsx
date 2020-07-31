import * as React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Browser from 'src/views/Browser'

const Stack = createStackNavigator()

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Browser"
        screenOptions={{}}
        mode="card"
        headerMode="none"
      >
        <Stack.Screen name="Browser" component={Browser} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}