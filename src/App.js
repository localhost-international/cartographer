/**
 * Carta - A decentralised web browser/OS
 * @format
 */

import React, { Component } from 'react';

import { Provider } from './utils/context';

import {
  Platform,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';



import { ComboInput } from './components/ComboInput';
import { BrowserView } from './views/BrowserView';


export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Provider>
        <SafeAreaView style={styles.safeArea}>
          <KeyboardAvoidingView
            style={styles.keyboardContainer}
            behavior="padding"
            enabled
          >
            <View style={styles.view}>
              <BrowserView />
              <ComboInput />
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </Provider>
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


