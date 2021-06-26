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

export type NavigationState = {
	urlInput: string;
	urlCurrent: string;
	webViewRef: React.RefObject<WebView> | null;
	webViewState: null | WebViewNavigation;
};

export const navigationState = atom({
	key: 'navigationState',
	default: <NavigationState>{
		urlInput: '',
		urlCurrent: 'https://foundation.app/@leslie',
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
