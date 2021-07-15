import React from 'react';
import { atom } from 'recoil';
import type { BigNumber } from 'ethers';
import type { WebView } from 'react-native-webview';

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

export type SettingsState = {
	settingsRef: null;
};

export const settingsState = atom({
	key: 'settingsState',
	default: <SettingsState>{
		settingsRef: null,
	},
});

type WebViewUrl = { uri: string };
type WebViewHtml = { html: string };

export type BrowserTabState = {
	tabRef?: React.RefObject<WebView> | null;
	tabActive: boolean;
	tabId: string;
	tabTitle: string | null;
	tabUriValue: string;
	tabUriCurrent: WebViewUrl | WebViewHtml;
	// tabMounted: boolean;
	// tabThumbnail: string | null;
	// tabLastActive: Date | null;
	// tabUri: string; // TODO - remove??!?!
};
export type BrowserTabsState = {
	tabs: BrowserTabState[];
	activeTab: {
		id: null | string;
		index: null | number;
	};
	previousTab: {
		id: null | string;
		index: null | number;
	};
};
export const browserTabsState = atom({
	key: 'browserTabsState',
	default: <BrowserTabsState>{
		tabs: [],
		activeTab: {
			id: null,
			index: null,
		},
		previousTab: {
			id: null,
			index: null,
		},
	},
	dangerouslyAllowMutability: true,
});
