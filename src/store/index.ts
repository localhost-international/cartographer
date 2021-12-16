import React from 'react';
import { atom } from 'recoil';
import type { BigNumber } from 'ethers';
import type { WebView } from 'react-native-webview';

export type BrowserInitialConfig = {
	userAgent: string;
};

export const browserInitialConfig = atom({
	key: 'browserInitialConfig',
	default: <BrowserInitialConfig>{
		userAgent:
			'Cartographer v0.1.0; Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X)',
	},
});

export type BrowserGlobalState = {
	addressBar: {
		focused: boolean;
	};
};

export const browserGlobalState = atom({
	key: 'browserGlobalState',
	default: <BrowserGlobalState>{
		addressBar: {
			focused: false,
		},
	},
});

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

export type WebViewUrl = { uri: string };
export type WebViewHtml = { html: string };
export type WebViewAddress = WebViewUrl | WebViewHtml;

export type TabState = {
	tabRef?: React.RefObject<WebView> | null;
	tabActive: boolean;
	tabId: string;
	tabTitle: string | null;
	tabUriValue: string | undefined;
	tabUriCurrent: WebViewAddress;
	// tabMounted: boolean;
	// tabThumbnail: string | null;
	// tabLastActive: Date | null;
};

export type TabsState = {
	tabs: TabState[];
	activeTab: {
		id: null | string;
		index: null | number;
	};
	previousTab: {
		id: null | string;
		index: null | number;
	};
};

export const tabsState = atom({
	key: 'tabsState',
	default: <TabsState>{
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
