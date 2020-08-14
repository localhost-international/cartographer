import React, { useState } from 'react'
import styled from 'styled-components/native'

import BrowserWebView from 'src/components/BrowserWebView'
import Navigation from 'src/components/Navigation'


const View = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
`
const SafeAreaView = styled.SafeAreaView`
  flex: 1;
`
const KeyboardAvoidingView = styled.KeyboardAvoidingView`
  flex: 1;
`


export default function Browser() {

  return (
    <>
      <KeyboardAvoidingView
        enabled
        behavior="padding"
      >
        <View>
          <BrowserWebView />
          <Navigation />
        </View>
      </KeyboardAvoidingView>
    </>
  )
}