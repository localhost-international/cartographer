import type { BrowserTabsState, BrowserTabState } from 'src/store';

export const newTab = (tabUri: string, previousTabs: BrowserTabsState) => {
	console.log('\n\nnewTab', previousTabs.tabIdIncrement, '\n\n');

	const newBrowsertab: BrowserTabState = {
		// tabRef: React.createRef(),
		tabActive: true,
		tabMounted: true,
		tabId: `tab-id-index-${previousTabs.tabIdIncrement}`,
		tabTitle: null,
		tabThumbnail: null,
		tabLastActive: null,
		tabUri: tabUri,
		tabUriValue: '',
		tabUriCurrent: {
			uri: tabUri,
		},
	};

	if (previousTabs.tabs.length) {
		console.log('Do previous tabs have length?', previousTabs.tabs.length);
		previousTabs.previousTabId = previousTabs.activeTabId;
	}

	// Set new tab as active ID, Index and Ref
	previousTabs.activeTabId = newBrowsertab.tabId;
	previousTabs.activeTabIndex = previousTabs.tabIdIncrement;

	if (previousTabs.tabs.length) {
		const previousTabIndex = previousTabs.tabs.findIndex(
			(tab) => tab.tabId === previousTabs.previousTabId,
		);
		previousTabs.tabs[previousTabIndex].tabActive = false;
	}
	previousTabs.tabs = [...previousTabs.tabs, newBrowsertab];
	previousTabs.tabIdIncrement++;
	return {
		...previousTabs,
	};
};

export const removeTab = (tabId: string, previousTabs: BrowserTabsState) => {
	const tabToRemoveByIndex = previousTabs.tabs.findIndex(
		(tab) => tab.tabId === tabId,
	);
	// If only one tab set activeTabId, previousTabId and activeTabIndex to null
	if (previousTabs.tabs.length === 1) {
		previousTabs.activeTabIndex = null;
		previousTabs.activeTabId = null;
		previousTabs.previousTabId = null;
	}
	// If there is more than 1 tab
	if (previousTabs.tabs.length > 1) {
		const activeIndex =
			tabToRemoveByIndex === 0
				? tabToRemoveByIndex + 1
				: tabToRemoveByIndex - 1;
		previousTabs.activeTabIndex = activeIndex;
		previousTabs.activeTabId = previousTabs.tabs[activeIndex].tabId;
		previousTabs.tabs[activeIndex].tabActive = true;
	}
	return {
		...previousTabs,
		tabs: [
			...previousTabs.tabs.slice(0, tabToRemoveByIndex),
			...previousTabs.tabs.slice(tabToRemoveByIndex + 1),
		],
	};
};

export const switchTab = (tabId: string, previousTabs: BrowserTabsState) => {
	const newTabId = tabId;
	const previousTabId = previousTabs.activeTabId;

	console.log('switchTab');
	// If there is only one tab, do nothing!
	if (previousTabs.tabs.length === 1) {
		console.log('Only one tab, so do nothing');
	}
	if (previousTabs.tabs.length >= 2) {
		// Get index of new tab to switch to
		const newActiveTabIndex = previousTabs.tabs.findIndex(
			(tab) => tab.tabId === newTabId,
		);
		previousTabs.activeTabId = previousTabs.tabs[newActiveTabIndex].tabId;
		previousTabs.activeTabIndex = newActiveTabIndex;
		previousTabs.tabs[newActiveTabIndex].tabActive = true;
		// Get index of previously selected tab
		const previousTabIndex = previousTabs.tabs.findIndex(
			(tab) => tab.tabId === previousTabId,
		);
		previousTabs.previousTabId = previousTabs.tabs[previousTabIndex].tabId;
		previousTabs.tabs[previousTabIndex].tabActive = false;
	}
	return {
		...previousTabs,
	};
};
