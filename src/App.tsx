/**
 * Carta - A decentralised web browser/OS
 * @format
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';


import { BrowserView } from './views/BrowserView';
import { ComboInput } from './components/ComboInput';


const INITIAL_URI = 'http://duck.com/'; //'http://status.im/';


interface Props { }
export default class App extends Component<Props> {
  render() {
    return (
      <SafeAreaView style={styles.safeArea}>

        <KeyboardAvoidingView
          style={styles.keyboardContainer}
          behavior="padding"
          enabled
          /*keyboardVerticalOffset={
            Platform.select({
              ios: () => 0,
              android: () => 12
            })()
          }*/
        >
          <View style={styles.view}>
            <BrowserView uri={INITIAL_URI} />
            <ComboInput uri={INITIAL_URI} />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,1)',
  },
  keyboardContainer: {
    flex: 1,
  },
  view: {
    flex: 1,
  },
});
