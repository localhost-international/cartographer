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
	tabMounted: boolean;
	tabId: string;
	tabTitle: string | null;
	tabThumbnail: string | null;
	tabLastActive: Date | null;
	tabUri: string; // TODO - Initial tab Uri for new tabs?
	tabUriValue: string;
	tabUriCurrent: WebViewUrl | WebViewHtml;
};
export type BrowserTabsState = {
	tabs: BrowserTabState[];
	// Active Tab
	activeTabId: null | string;
	activeTabIndex: null | number;
	// Previous Tab
	previousTabId: null | string;
	tabIdIncrement: number;
};
export const browserTabsState = atom({
	key: 'browserTabsState',
	default: <BrowserTabsState>{
		tabs: [],
		activeTabId: null,
		activeTabIndex: null,
		previousTabId: null,
		tabIdIncrement: 0,
	},
	dangerouslyAllowMutability: true,
});
