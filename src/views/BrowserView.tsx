import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { WebView } from 'react-native-webview'

type Props = {
  uri: string
}
export class BrowserView extends Component<Props> {

  onNavigationStateChange() {
    console.log('onNavigationStateChange')
  }

  render() {
    return (
      <View style={styles.container}>
        <WebView
          style={styles.webView}
          useWebKit={false} 
          originWhitelist={['*']}
          source={{uri: this.props.uri }} 
          onNavigationStateChange={ this.onNavigationStateChange }
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    //backgroundColor: '#F5FCFF', 
  },
  webView: {
    flex: 1,
  }
})