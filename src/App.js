/**
 * Carta - A decentralised web browser/OS
 * @format
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';


const INITIAL_URI = 'http://duck.com/'; //'http://status.im/';



import { ComboInput } from '../src/components/ComboInput';
import { BrowserView } from '../src/views/BrowserView';



//type Props = {};
// TODO - Re-add React's "native" <Props>"types"

export default class App extends Component {
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


