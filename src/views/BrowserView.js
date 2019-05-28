import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { WebView } from 'react-native-webview';

import { Consumer } from 'src/utils/context';


export class BrowserView extends Component {

  onNavigationStateChange() {
    console.log('onNavigationStateChange')
  }

  render() {
    return (
      <Consumer>
        {({ urlSource, urlUpdate }) => {

          return (
            <View style={ styles.container }>
              <WebView
                style={ styles.webView }
                useWebKit={ true }
                originWhitelist={ ['*'] }
                // source={{ uri: urlSource }}
                source={{ 
                  uri: urlSource, 
                  //html: '' // Note: `html` overrides uri
                }}
                onLoad={ 
                  (evt) => {
                    console.log(`%cWebView - onLoad`, `background: dodgerblue; color: white;`);
                    console.log(evt);
                  }
                }
                onNavigationStateChange={ this.onNavigationStateChange }
                onError={ (err) => {
                  console.log('Error Loading Page', err, this);
                  // urlUpdate('http://leslieoa.com/')
                }}
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