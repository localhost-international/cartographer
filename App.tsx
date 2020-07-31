import React from 'react'
import { Provider } from 'react-redux'

import store from 'src/store/index'

import AppNavigator from 'src/AppNavigator'


export default function App() {
  return (
    <>
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    </>
  )
}
