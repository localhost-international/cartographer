import React, { Component } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { WebView } from 'react-native-webview';

import { Consumer } from '../utils/context';


export class BrowserView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      url: '',
    };
  };

  onNavigationStateChange() {
    console.log('onNavigationStateChange')
  }

  render() {
    return (
      <Consumer>
        {({ urlCurrent, urlUpdate }) => {

          return (
            <View style={styles.container}>
              <WebView
                style={styles.webView}
                useWebKit={true}
                originWhitelist={['*']}
                source={{ uri: urlCurrent }}
                onNavigationStateChange={this.onNavigationStateChange}
              />
            </View>
          )
        }}
      </Consumer>
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