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
	tabRef: React.RefObject<WebView> | null;
	tabIndex: number;
	tabActive: boolean;
	tabMounted: boolean;
	tabId: string;
	tabTitle: string;
	tabThumbnail: null | string;
	tabLastActive: null | Date;
	tabUri: string; // TODO - Initial tab Uri for new tabs?
	tabUriValue: string;
	tabUriCurrent: WebViewUrl | WebViewHtml;
};
export type BrowserTabsState = {
	tabs: BrowserTabState[];
	// Active Tab
	activeTabId: null | string;
	activeTabIndex: null | number;
	activeTabRef: React.RefObject<WebView> | null;
	// Previous Tab
	previousTabId: null | string;
	tabIncrement: number;
};
export let browserTabsState = atom({
	key: 'browserTabsState',
	default: <BrowserTabsState>{
		tabs: [],
		activeTabId: null,
		activeTabIndex: null,
		activeTabRef: null,
		previousTabId: null,
		tabIncrement: 0,
	},
	dangerouslyAllowMutability: true,
});
