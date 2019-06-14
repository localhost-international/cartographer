import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Text,
  Button,
  SafeAreaView, 
  KeyboardAvoidingView,
} from 'react-native';

import { Provider } from 'src/utils/context';

import ComboInput from 'src/components/Browser/Navigation';
import { BrowserWebView } from 'src/components/Browser/WebView';


export default class Browser extends Component {

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
              <BrowserWebView />
              <ComboInput />
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </Provider>
    )
  }
};


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
