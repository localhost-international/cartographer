import React from 'react';
import type { BrowserTabsState, BrowserTabState } from 'src/store';

/**
 * TODO
 *  - Consider the memory/performance cost of this
 */
export const newTab = (tabUri: string, previousTabs: BrowserTabsState) => {
	console.log('\n\nnewTab', previousTabs.tabIncrement, '\n\n');

	const newBrowsertab: BrowserTabState = {
		tabRef: React.createRef(),
		tabIndex: previousTabs.tabIncrement,
		tabActive: true,
		tabMounted: true,
		tabId: `tab-id-index-${previousTabs.tabIncrement}`,
		tabTitle: `Tab ${previousTabs.tabIncrement + 1}`,
		tabThumbnail: null,
		tabLastActive: null,
		tabUri: tabUri,
		tabUriValue: '',
		tabUriCurrent: {
			uri: tabUri,
		},
	};

	if (previousTabs.tabs.length) {
		previousTabs.previousTabId = previousTabs.activeTabId;
	}

	// Set new tab as active ID, Index and Ref
	previousTabs.activeTabId = newBrowsertab.tabId;
	previousTabs.activeTabIndex = previousTabs.tabIncrement;
	previousTabs.activeTabRef = newBrowsertab.tabRef;

	if (previousTabs.tabs.length) {
		const previousTabIndex = previousTabs.tabs.findIndex(
			(tab) => tab.tabId === previousTabs.previousTabId,
		);
		previousTabs.tabs[previousTabIndex].tabActive = false;
	}
	previousTabs.tabs = [...previousTabs.tabs, newBrowsertab];
	previousTabs.tabIncrement++;
	return {
		...previousTabs,
	};
};

export const removeTab = (tabId: string, previousTabs: BrowserTabsState) => {
	const deleteTabByIndex = previousTabs.tabs.findIndex(
		(tab) => tab.tabId === tabId,
	);
	if (previousTabs.tabs.length > 1) {
		const activeIndex =
			deleteTabByIndex === 0 ? deleteTabByIndex + 1 : deleteTabByIndex - 1;

		previousTabs.activeTabIndex = activeIndex;
		previousTabs.activeTabId = previousTabs.tabs[activeIndex].tabId;
		previousTabs.activeTabRef = previousTabs.tabs[activeIndex].tabRef;
		previousTabs.tabs[activeIndex].tabActive = true;
	} else {
		previousTabs.activeTabId = null;
		previousTabs.activeTabRef = null;
		previousTabs.previousTabId = null;
	}
	return {
		...previousTabs,
		tabs: [
			...previousTabs.tabs.slice(0, deleteTabByIndex),
			...previousTabs.tabs.slice(deleteTabByIndex + 1),
		],
	};
};

export const switchTab = (tabId: string, previousTabs: BrowserTabsState) => {
	if (previousTabs.tabs.length) {
		const previousTabIndex = previousTabs.tabs.findIndex(
			(tab) => tab.tabId === previousTabs.previousTabId,
		);
		console.log('previousTabIndex', previousTabIndex);
		previousTabs.tabs[previousTabIndex].tabActive = false;
		previousTabs.previousTabId = previousTabs.activeTabId;
		const newTabIndex = previousTabs.tabs.findIndex(
			(tab) => tab.tabId === tabId,
		);
		previousTabs.tabs[newTabIndex].tabActive = true;
		previousTabs.activeTabIndex = newTabIndex;
		previousTabs.activeTabRef = previousTabs.tabs[newTabIndex].tabRef;
	}
	previousTabs.activeTabId = tabId;
	return {
		...previousTabs,
	};
};
