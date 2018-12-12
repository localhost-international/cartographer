/**
 * https://github.com/facebook/react-native
 * https://github.com/emin93/react-native-template-typescript
 * 
 * @format
 */

import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, SafeAreaView } from 'react-native'

import { BrowserView } from './views/BrowserView'

const platform = Platform.select({ios: `iOS`, android: `Android`})

interface Props {}
export default class App extends Component<Props> {
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <Text style={styles.welcome}>Carta</Text>
          <BrowserView />
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
  },
})
