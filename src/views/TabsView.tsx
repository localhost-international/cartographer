import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import { BlurView } from '@react-native-community/blur';

import { IsDarkMode } from 'src/utils/appearance';

import { browserTabsState } from 'src/store';
import type { BrowserTabState } from 'src/store';

import { newTab, switchTab, removeTab } from 'src/utils/tabs';

export default function Tabs() {
  const screenNavigation = useNavigation();

  const [browserTabs, setBrowserTabs] = useRecoilState(browserTabsState);
  const [searchTabs, setSearchTabs] = useState('');

  const goBack = () => screenNavigation.goBack();

  const _renderItem: any = ({ item }: { item: BrowserTabState }) => {
    const { tabIndex, tabId, tabTitle, tabUriValue } = item;
    return (
      <TabListItem
        key={tabIndex}
        onPress={() => {
          setBrowserTabs(switchTab(tabId, browserTabs));
          goBack();
        }}>
        <TabListItemTitle>
          {tabTitle.length ? tabTitle : '[No title]'}
        </TabListItemTitle>
        <TabListItemUrl>{tabUriValue}</TabListItemUrl>

        <TabWebViewDeleteButton
          onPress={() => {
            setBrowserTabs(removeTab(tabId, browserTabs));
          }}>
          <TabWebViewDeleteButtonText>Close</TabWebViewDeleteButtonText>
        </TabWebViewDeleteButton>
      </TabListItem>
    );
  };

  return (
    <>
      <BlurViewContainer blurType={IsDarkMode() ? 'dark' : 'light'} />
      <Header>
        <CloseButton onPress={goBack}>
          <CloseButtonText>Done</CloseButtonText>
        </CloseButton>
        <TabsTitle>Tabs</TabsTitle>
      </Header>
      <Body>
        <SearchTabs
          placeholder="Search by tab title or address"
          value={searchTabs}
          onChangeText={(query: string) => {
            setSearchTabs(query);
          }}
          onSubmitEditing={() => {
            console.log('TODO - Search for wallet information');
          }}
          autoCapitalize="none"
          autoCompleteType="off"
          autoCorrect={false}
          returnKeyType="search"
          keyboardAppearance={IsDarkMode() ? 'dark' : 'light'}
          blurOnSubmit={true}
          clearButtonMode="always"
          textContentType="none"
        />

        <NewTabButton
          onPress={() => {
            setBrowserTabs(newTab('https://metamask.com/', browserTabs));
          }}>
          <NewTabButtonText>Ext: Add New Tab</NewTabButtonText>
        </NewTabButton>

        {browserTabs.tabs.length ? (
          <TabList
            data={browserTabs.tabs}
            renderItem={_renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <TabListItem>
            <TabListItemTitle>No tabs</TabListItemTitle>
          </TabListItem>
        )}
      </Body>
    </>
  );
}

const BlurViewContainer = styled(BlurView)`
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  top: 0;
`;

const Header = styled.View`
  background-color: ${(props) => props.theme.ui.background};
  padding: 20px;
  z-index: 0;
`;

const CloseButton = styled.Pressable.attrs(() => ({
  hitSlop: 20,
}))`
  position: absolute;
  top: 24px;
  right: 24px;
  z-index: 1;
`;
const CloseButtonText = styled.Text`
  color: ${(props) => props.theme.colors.text};
  font-size: 18px;
  z-index: 1;
`;

const Body = styled.View`
  background-color: ${(props) => props.theme.ui.background};
  flex: 1;
`;

const TabsTitle = styled.Text`
  color: ${(props) => props.theme.colors.header};
  font-size: 44px;
  font-weight: 600;
`;

const SearchTabs = styled.TextInput`
  font-size: 18px;
  text-align: left;
  margin: 20px 20px 20px 20px;
  padding: 10px;
  border-radius: 6px;
  background: ${(props) => props.theme.ui.foreground};
  color: ${(props) => props.theme.addressBar.color};
`;

const TabList = styled.FlatList`
  border-top-width: 1px;
  border-top-color: ${(props) => props.theme.addressBar.background};
`;
const TabListItem = styled.Pressable`
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.addressBar.background};
  font-size: 24px;
  font-weight: 600;
  padding: 15px 20px;
`;
const TabListItemTitle = styled.Text`
  color: ${(props) => props.theme.colors.title};
  font-size: 24px;
  font-weight: 600;
`;

const TabListItemUrl = styled.Text`
  color: ${(props) => props.theme.colors.text};
  opacity: 0.5;
  font-size: 16px;
  font-weight: 400;
`;

const TabWebViewDeleteButton = styled.Pressable`
  align-self: flex-start;
  background-color: red;
`;
const TabWebViewDeleteButtonText = styled.Text`
  font-size: 20px;
  color: white;
  padding: 10px;
`;

const NewTabButton = styled.Pressable`
  color: ${(props) => props.theme.colors.text};
  font-size: 16px;
  font-weight: 400;
  padding: 20px;
  background: rgba(105, 215, 0, 1);
`;

const NewTabButtonText = styled.Text`
  color: ${(props) => props.theme.colors.text};
  opacity: 0.5;
  font-size: 20px;
  font-weight: 600;
`;
