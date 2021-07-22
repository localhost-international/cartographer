import React from 'react';
import type { TabsState, TabState } from 'src/store';
import uuid from 'src/utils/uuid';

export const getIndexByTabId = (
	tabId: string,
	tabsState: TabState[],
): number => {
	return tabsState.findIndex((tab) => tab.tabId === tabId);
};

export const newTab = (newTabUri: string, tabsState: TabsState): TabsState => {
	const newBrowserTabObj: TabState = {
		tabRef: React.createRef(),
		tabActive: true,
		tabId: `browser-tab-id-${uuid.chars12()}-${uuid.timestamp()}`,
		tabTitle: null,
		tabUriValue: '',
		tabUriCurrent: {
			uri: newTabUri,
		},
	};
	tabsState.tabs.map((tab) => {
		return { ...tab, tabActive: false };
	});
	const newBrowserTabs = [...tabsState.tabs, newBrowserTabObj];
	const newActiveTab = {
		id: newBrowserTabObj.tabId,
		index: getIndexByTabId(newBrowserTabObj.tabId, newBrowserTabs),
	};
	const newPreviousTab = {
		id: tabsState.activeTab.id,
		index: tabsState.activeTab.index,
	};
	return {
		...tabsState,
		tabs: newBrowserTabs,
		activeTab: newActiveTab,
		previousTab: newPreviousTab,
	};
};

export const removeTab = (tabId: string, tabsState: TabsState): TabsState => {
	const removeTabIndex = getIndexByTabId(tabId, tabsState.tabs);
	const newBrowserTabs = [
		...tabsState.tabs.slice(0, removeTabIndex),
		...tabsState.tabs.slice(removeTabIndex + 1),
	];
	newBrowserTabs.map((tab) => {
		return { ...tab, tabActive: false };
	});
	if (newBrowserTabs.length >= 1) {
		newBrowserTabs[0].tabActive = true;
	}
	return {
		...tabsState,
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

export const switchTab = (tabId: string, tabsState: TabsState) => {
	const switchTabIndex = getIndexByTabId(tabId, tabsState.tabs);
	const newTabs = tabsState.tabs.map((tab) => {
		return { ...tab, tabActive: false };
	});
	newTabs[switchTabIndex].tabActive = true;
	return {
		...tabsState,
		tabs: [...newTabs],
		activeTab: {
			id: newTabs[switchTabIndex].tabId,
			index: switchTabIndex,
		},
	};
};

export const closeAllTabs = (tabsState: TabsState): TabsState => {
	return {
		tabs: [],
		activeTab: {
			id: null,
			index: null,
		},
		previousTab: tabsState.activeTab,
	};
};
