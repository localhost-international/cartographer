/**
 * Carta - A decentralised web browser
 */


import React, { Component } from 'react'
import {
  Platform,
  SafeAreaView,
  KeyboardAvoidingView,
  View,
  StyleSheet,
} from 'react-native'


import { BrowserView } from './views/BrowserView'
import { ComboInput } from './components/ComboInput'


const INITIAL_URI = 'http://duckduckgo.com/'


type Props = {
  uri: string
}
export default class App extends Component<Props> {

  componentDidMount() {
  }

  componentWillUnmount() {

  }

  render() {
    return (
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        enabled={true}
        behavior='padding'
      >
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.view}>
            <BrowserView uri={INITIAL_URI} />
            <ComboInput uri={INITIAL_URI} />
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    //backgroundColor: 'rgba(255,255,255,1)',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  view: {
    flex: 1,
  },
})
