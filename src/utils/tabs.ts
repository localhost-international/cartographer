// const crypto = require('crypto');

import React from 'react';
import type { BrowserTabsState, BrowserTabState } from 'src/store';
import uuid from 'src/utils/uuid';

export const getIndexByTabId = (
	tabId: string,
	browserTabsState: BrowserTabState[],
): number => {
	return browserTabsState.findIndex((tab) => tab.tabId === tabId);
};

export const newTab = (
	newTabUri: string,
	browserTabsState: BrowserTabsState,
): BrowserTabsState => {
	const newBrowserTabObj: BrowserTabState = {
		tabRef: React.createRef(),
		tabActive: true,
		tabId: `browser-tab-id-${uuid.chars12()}-${uuid.timestamp()}`,
		tabTitle: null,
		tabUriValue: '',
		tabUriCurrent: {
			uri: newTabUri,
		},
	};
	browserTabsState.tabs.map((tab) => {
		return { ...tab, tabActive: false };
	});
	const newBrowserTabs = [...browserTabsState.tabs, newBrowserTabObj];
	const newActiveTab = {
		id: newBrowserTabObj.tabId,
		index: getIndexByTabId(newBrowserTabObj.tabId, newBrowserTabs),
	};
	const newPreviousTab = {
		id: browserTabsState.activeTab.id,
		index: browserTabsState.activeTab.index,
	};
	return {
		...browserTabsState,
		tabs: newBrowserTabs,
		activeTab: newActiveTab,
		previousTab: newPreviousTab,
	};
};

export const removeTab = (
	tabId: string,
	browserTabsState: BrowserTabsState,
): BrowserTabsState => {
	const removeTabIndex = getIndexByTabId(tabId, browserTabsState.tabs);
	const newBrowserTabs = [
		...browserTabsState.tabs.slice(0, removeTabIndex),
		...browserTabsState.tabs.slice(removeTabIndex + 1),
	];
	newBrowserTabs.map((tab) => {
		return { ...tab, tabActive: false };
	});
	if (newBrowserTabs.length >= 1) {
		newBrowserTabs[0].tabActive = true;
	}
	return {
		...browserTabsState,
		tabs: !newBrowserTabs.length ? [] : newBrowserTabs,
		activeTab: !newBrowserTabs.length
			? { id: null, index: null }
			: newBrowserTabs.length >= 1
			? { id: newBrowserTabs[0].tabId, index: 0 }
			: { id: newBrowserTabs[0].tabId, index: 0 },
		previousTab: !newBrowserTabs.length
			? { id: null, index: null }
			: newBrowserTabs.length >= 1
			? { id: newBrowserTabs[0].tabId, index: 0 }
			: { id: newBrowserTabs[0].tabId, index: 0 },
	};
};

export const switchTab = (
	tabId: string,
	browserTabsState: BrowserTabsState,
) => {
	const switchTabIndex = getIndexByTabId(tabId, browserTabsState.tabs);
	const newTabs = browserTabsState.tabs.map((tab) => {
		return { ...tab, tabActive: false };
	});
	newTabs[switchTabIndex].tabActive = true;
	return {
		...browserTabsState,
		tabs: [...newTabs],
		activeTab: {
			id: newTabs[switchTabIndex].tabId,
			index: switchTabIndex,
		},
	};
};
