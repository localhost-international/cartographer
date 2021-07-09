import React from 'react';
import { atom } from 'recoil';
import type { BigNumber } from 'ethers';
import type { WebView, WebViewNavigation } from 'react-native-webview';

export type EthereumState = {
	ethWalletAddress: BigNumber | string | null;
	ethWalletHex: string | null;
	ethWalletEns: string | null;
	ethWalletBalance: string;
};

export const ethereumState = atom({
	key: 'ethereumState',
	default: <EthereumState>{
		ethWalletAddress: null,
		ethWalletHex: null,
		ethWalletEns: null,
		ethWalletBalance: '...',
	},
});

type WebViewUrl = {
	uri: string;
};
type WebViewHtml = {
	html: string;
};

export type NavigationState = {
	urlInput: string;
	urlCurrent: WebViewUrl | WebViewHtml;
	webViewRef: React.RefObject<WebView> | null;
	webViewState: null | WebViewNavigation;
};

export const navigationState = atom({
	key: 'navigationState',
	default: <NavigationState>{
		urlInput: '',
		urlCurrent: {
			uri: 'https://colony.io/',
		},
		webViewRef: null,
		webViewState: null,
	},
	// Find a way to use the ref and remove this
	dangerouslyAllowMutability: true,
});

export type SettingsState = {
	settingsRef: null;
};

export const settingsState = atom({
	key: 'settingsState',
	default: <SettingsState>{
		settingsRef: null,
	},
});

export type BrowserTabState = {
	tabRef: any;
	tabIndex: number;
	tabActive: boolean;
	tabMounted: boolean;
	tabId: string;
	tabTitle: string;
	tabUri: string;
	tabThumbnail: null | string;
	tabLastActive: null | Date;
};
export type BrowserTabsState = {
	tabs: BrowserTabState[];
	activeTabId: null | string;
	previousTabId: null | string;
	tabIncrement: number;
};
export const browserTabsState = atom({
	key: 'browserTabsState',
	default: <BrowserTabsState>{
		tabs: [],
		activeTabId: null,
		previousTabId: null,
		tabIncrement: 0,
	},
	dangerouslyAllowMutability: true,
});
