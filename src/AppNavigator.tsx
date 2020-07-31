import React from 'react'
import { Text, TouchableOpacity, Button, Alert } from 'react-native'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'

import Browser from 'src/views/Browser'
import Settings from 'src/views/Settings'

const Stack = createStackNavigator()

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Browser"
        screenOptions={{
          cardOverlayEnabled: true,
          cardShadowEnabled: true,
          gestureEnabled: true,
          ...TransitionPresets.ModalPresentationIOS,
          headerStyle: {

          }
        }}
        mode="modal"
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
            title: 'Settings',
            headerShown: true,
            headerBackTitleVisible: false,
            headerLeft: props => (null),
            headerRight: props => (
              <Button title="Done" onPress={() => { }} />
            ),
            headerTitle: props => (
              <Text style={{ fontSize: 22 }}>Settings</Text>
            )
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}