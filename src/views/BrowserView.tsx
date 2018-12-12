import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { WebView } from 'react-native-webview'

interface Props {}
export class BrowserView extends Component {
  render() {
    return (
      <View style={styles.container}>
        <WebView
          originWhitelist={['*']}
          source={{
            uri: 'https://www.fidelity.co.uk/home'
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 720,
    backgroundColor: '#F5FCFF',
  }
})