import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { withNavigation } from 'react-navigation';

import { Provider } from 'src/utils/context';

import { ProgressIndicator } from 'src/components/ProgressIndicator';


let browserRef = null;

const url = 'http://www.duck.com/';

const searchEngines = {
  'duck': (query) => `https://duckduckgo.com/?q=${query}`,
  'google': (query) => `https://www.google.com/search?q=${query}`,
  'bing': (query) => `https://www.bing.com/search?q=${query}`
};

const upgradeURL = (uri, searchEngines = 'google') => {
  const isURL = uri.split(' ').length === 1 && uri.includes('.');
  if (isURL) {
    if (!uri.startsWith('http')) {
      return `https://www.${uri}`;
    }
    return uri;
  }
  const encodedURI = encodeURI(uri);
  return searchEngines[searchEngine](encodedURI);
};


const injectedJavaScript = `
  window.ReactNativeWebView.postMessage('injected javascript works!');
  // true is required to prevent silent failures
  true; 
`;



class Browser extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentURL: url,
      urlText: url,
      title: '',
      canGoForward: false,
      canGoBack: false,
      incognito: false,
      config: {
        detectorTypes: 'all',
        allowStorage: true,
        allowJavascript: true,
        allowCookies: true,
        allowLocation: true,
        allowCaching: true,
        defaultSearchEngine: 'duck'
      }
    };
  };

  get config() {
    const { incognito, config } = this.state;
    if (incognito) {
      return {
        ...config,
        allowStorage: false,
        allowCookies: false,
        allowLocation: false,
        allowCaching: false,
      }
    }
    return config;
  };

  toggleIncognito = () => {
    this.setState({
      incognito: !this.state.incognito
    });
    this.reload()
  };

  loadURL = () => {
    const { config, urlText } = this.state;
    const { defaultSearchEngine } = config;
    const newURL = upgradeURL(urlText, defaultSearchEngine);
    this.setState({
      currentURL: newURL,
      urlText: newURL
    });
    Keyboard.dismiss();
  };

  updateUrlText = (text) => {
    this.setState({
      urlText: text
    });
  };

  goForward = () => {
    if (browserRef && this.state.canGoForward) {
      browserRef.goForward();
    }
  };

  goBack = () => {
    if (browserRef && this.state.canGoBack) {
      browserRef.goBack();
    }
  };

  reload = () => {
    if (browserRef) {
      browserRef.reload();
    }
  };

  setBrowserRef = (browser) => {
    // console.log('setBrowserRef', browser, browserRef);
    if (!browserRef) {
      browserRef = browser
    }
  };

  onBrowserError = (syntheticEvent) => {
    const { nativeEvent } = syntheticEvent;
    console.warn('WebView error: ', nativeEvent)
  };

  onBrowserLoad = (syntheticEvent) => {
    const { canGoForward, canGoBack, title } = syntheticEvent.nativeEvent;
    this.setState({
      canGoForward,
      canGoBack,
      title
    })
  };

  onNavigationStateChange = (navState) => {
    const { canGoForward, canGoBack, title } = navState;
    this.setState({
      canGoForward,
      canGoBack,
      title
    })
  };

  filterRequest = (request) => {
    return true;
  };

  onBrowserMessage = (event) => {
    console.log('#'.repeat(25));
    console.log('Message from browser:', event.nativeEvent.data);
    console.log('#'.repeat(25))
  };

  render() {
    const { config, state } = this;
    const { navigate } = this.props.navigation;
    const {
      currentURL, urlText, canGoForward, canGoBack, title, incognito
    } = state;
    return (
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          style={styles.keyboardContainer}
          behavior="padding"
          enabled
        >
          <View style={styles.view}>
            <WebView
              useWebKit={true}
              ref={this.setBrowserRef}
              originWhitelist={['*']}
              source={{ uri: currentURL }}
              onLoad={this.onBrowserLoad}
              onError={this.onBrowserError}
              onNavigationStateChange={this.onNavigationStateChange}
              renderLoading={() => <ProgressIndicator />}
              onShouldStartLoadWithRequest={this.filterRequest}
              onMessage={this.onBrowserMessage}
              dataDetectorTypes={config.detectorTypes}
              thirdPartyCookiesEnabled={config.allowCookies}
              domStorageEnabled={config.allowStorage}
              javaScriptEnabled={config.allowJavascript}
              geolocationEnabled={config.allowLocation}
              cacheEnabled={config.allowCaching}
              injectedJavaScript={injectedJavaScript}
            />

            <View style={styles.browserBar}>
              <TextInput
                style={styles.browserAddressBar}
                onChangeText={this.updateUrlText}
                onSubmitEditing={this.loadURL}
                value={urlText}
                autoCapitalize="none"
                returnKeyType="go"
              />
              <View style={styles.iconContainer}>
                <TouchableOpacity style={styles.icon} onPress={this.goBack}>
                  <Text style={styles.iconText}>⬅️</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.icon} onPress={this.goForward}>
                  <Text style={styles.iconText}>➡️</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.icon} onPress={this.reload}>
                  <Text style={styles.iconText}>🔃</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.icon} onPress={() => navigate('Settings')}>
                  <Text style={styles.iconText}>⚙️</Text>
                </TouchableOpacity>
              </View>
            </View>

          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
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
  browserBar: {
    backgroundColor: 'rgba(0,0,0,.05)',
    flexDirection: 'row',
    alignItems: 'center'
  },
  browserAddressBar: {
    flex: 1,
    fontSize: 18,
    textAlign: 'left',
    padding: 8,
    backgroundColor: 'rgba(223,228,231,1)',
  },
  browserContainer: {
    flex: 2
  },
  icon: {
    width: 30,
    height: 30,
    marginLeft: 2.5,
    marginRight: 2.5,
    flexDirection: 'row',
  },
  iconText: {
    fontSize: 25,
  },
  iconContainer: {
    flex: 0,
    flexDirection: 'row',
    marginLeft: 5,
    marginRight: 5,
  },
  disabled: {
  }
});


export default withNavigation(Browser);