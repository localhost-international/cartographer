import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { WebView } from 'react-native-webview';

import { Consumer } from 'src/utils/context';


export class BrowserWebView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activityIndicatorVisible: false,
    }
  }

  onNavigationStateChange() {
    console.log('onNavigationStateChange')
  }

  hideActivityIndicator() {
    this.setState({ activityIndicatorVisible: false });
  }
  showActivityIndicator() {
    this.setState({ activityIndicatorVisible: true });
  }

  render() {
    return (
      <Consumer>
        {({ urlSource, urlUpdate }) => {

          return (
            <View style={styles.container}>
              <WebView
                style={styles.webView}
                useWebKit={true}
                originWhitelist={['*']}
                renderLoading={() => <ActivityIndicator className={styles.activityIndicator} size="small" color="rgba(0,0,0,.25)" />}
                // startInLoadingState={true}
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
                onNavigationStateChange={this.onNavigationStateChange}
                onError={(err) => {
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
  },
  activityIndicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'

  }
})