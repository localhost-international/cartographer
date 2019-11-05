import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	TextInput,
	TouchableOpacity,
	SafeAreaView,
	KeyboardAvoidingView,
	Keyboard,
	ActivityIndicator,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { withNavigation } from 'react-navigation';

import IconArrowLeft from 'src/assets/icons/icon-arrow-left.svg';
import IconArrowRight from 'src/assets/icons/icon-arrow-right.svg';
import IconOptions from 'src/assets/icons/icon-options.svg';
import IconRefresh from 'src/assets/icons/icon-refresh.svg';
import IconTabs from 'src/assets/icons/icon-tabs.svg';


export interface Props {
	
}
export interface State {

}


let browserRef = null;

const searchEngines = {
	'duck': (query) => `https://duckduckgo.com/?q=${query}`,
	'google': (query) => `https://www.google.com/search?q=${query}`,
	'bing': (query) => `https://www.bing.com/search?q=${query}`
};

const defaultSites = [
  `https://infura.io/`,
  `https://www.digital-democracy.org/`,
	`https://www.wireline.io/`,
	`https://dat.foundation`,
	`https://bits.coop/#about`,
	`https://start.duckduckgo.com/`,
	`https://www.colophon-foundry.org/typefaces/system85/`
]

const url = defaultSites[0];



const upgradeURL = (uri, searchEngine = 'duck') => {
	const isURL = uri.split(' ').length === 1 && uri.includes('.');
	if (isURL) {
		if (!uri.startsWith('http')) {
			return `https://${uri}`; // `https://www.${uri}`;
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



const ProgressIndicator = () => {

}


class Browser extends Component<Props, State> {

	constructor(props) {
		super(props);
		this.state = {
			browserRef: React.createRef(),
			currentURL: url,
			urlText: url,
			title: '',
			canGoForward: false,
			canGoBack: false,
			incognito: false,
			webviewVisible: true,
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

	hideLoading() {
		this.setState({ webviewVisible: false });
	}

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

	openTabs = () => {
		alert('TODO - Implement tab interface');
	}

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

		this.hideLoading();

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
			<>
				<KeyboardAvoidingView
					style={styles.keyboardContainer}
					behavior="padding"
					enabled
				>
					<View style={styles.view}>
						<SafeAreaView style={styles.browserContainer}>
							<WebView
								style={styles.browserWindow}
								useWebKit={true}
								ref={this.setBrowserRef}
								originWhitelist={['*']}
								source={{ uri: currentURL }}
								onLoad={this.onBrowserLoad}
								onError={this.onBrowserError}
								onNavigationStateChange={this.onNavigationStateChange}
								// renderLoading={() => <ProgressIndicator />} // TODO - Implement
								startInLoadingState
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
							{/* {this.state.webviewVisible && (<ActivityIndicator style={{ position: 'absolute', top: 40, left: 40 }} size="large" />)} */}
						</SafeAreaView>

						<View style={styles.browserBar}>
							<View style={styles.browserAddressBar}>
								<TextInput
									style={styles.browserAddressTextInput}
									onChangeText={this.updateUrlText}
									onSubmitEditing={this.loadURL}
									value={urlText}
									autoCapitalize="none"
									autoCompleteType="off"
									autoCorrect={false}
									returnKeyType="go"
									blurOnSubmit={true}
									clearButtonMode="while-editing"
									enablesReturnKeyAutomatically={false} // Android
									keyboardAppearance="light" // dark
									keyboardType="url"
									returnKeyLabel="go"
									selectTextOnFocus={true}
									textContentType="URL"
								/>
							</View>
							<SafeAreaView>
								<View style={styles.iconContainer}>
									<TouchableOpacity style={[styles.icons, styles.iconGoBack]} onPress={this.goBack}>
										<IconArrowLeft width={22} height={29} />
									</TouchableOpacity>
									<TouchableOpacity style={[styles.icons, styles.iconGoForward]} onPress={this.goForward}>
										<IconArrowRight width={22} height={29} />
									</TouchableOpacity>
									<TouchableOpacity style={[styles.icons, styles.iconOpenTabs]} onPress={this.openTabs}>
										<IconTabs width={25} height={23} />
									</TouchableOpacity>
									<TouchableOpacity style={[styles.icons, styles.iconReload]} onPress={this.reload}> 
										<IconRefresh width={28} height={24} />
									</TouchableOpacity>
									<TouchableOpacity style={[styles.icons, styles.iconOptions]} onPress={() => navigate('Settings')}>
										<IconOptions width={24} height={24} />
									</TouchableOpacity>
								</View>
							</SafeAreaView>
						</View>
					</View>
				</KeyboardAvoidingView>
			</>
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
	browserContainer: {
		flexGrow: 1
	},
	browserWindow: {
		paddingTop: 20,
		flex: 2,
	},
	browserBar: {
		backgroundColor: 'rgba(0,0,0,.05)',
		flexGrow: 0,
		borderTopWidth: 1,
		borderTopColor: 'rgba(0,0,0,.1)',
	},
	browserAddressBar: {
		marginLeft: 10,
		marginRight: 10,
		marginTop: 10,
		marginBottom: 10,
		borderRadius: 6,
		backgroundColor: 'rgba(0,0,0,.08)',
	},
	browserAddressTextInput: {
		fontSize: 18,
		textAlign: 'left',
    padding: 8,
    color: 'black',
	},
	iconContainer: {
		marginLeft: 16,
		marginRight: 10,
		paddingTop: 8,
		paddingBottom: 0,
		// marginBottom: 6,
		// bottom: 6,
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	icons: {
		width: 30,
		height: 30,
		marginLeft: 2.5,
		marginRight: 2.5
	},
	iconGoBack: { marginTop: 0 },
	iconGoForward: { marginTop: 0 },
	iconOpenTabs: { marginTop: 4 },
	iconReload: { marginTop: 4 },
	iconOptions: { marginTop: 4 },
	
	disabled: {
	}
});


export default withNavigation(Browser);