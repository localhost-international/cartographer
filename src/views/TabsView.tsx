import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRecoilState } from 'recoil';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import { BlurView } from '@react-native-community/blur';

import { IsDarkMode } from 'src/utils/appearance';

import { browserTabsState } from 'src/store';
import type { BrowserTabState } from 'src/store';

import { newTab, switchTab, removeTab } from 'src/utils/tabs';

import IconClose from 'src/assets/icons/icon-close-filled.svg';

export default function Tabs() {
  const screenNavigation = useNavigation();

  const [browserTabs, setBrowserTabs] = useRecoilState(browserTabsState);
  const [searchTabs, setSearchTabs] = useState('');

  const goBack = () => screenNavigation.goBack();

  const _renderItem: any = ({ item }: { item: BrowserTabState }) => {
    const { tabId, tabTitle, tabUriValue } = item;
    return (
      <TabListItem
        key={tabId}
        onPress={() => {
          setBrowserTabs(switchTab(tabId, browserTabs));
          goBack();
        }}>
        <TabListItemTitle>
          {tabTitle ? tabTitle : '[No title]'}
        </TabListItemTitle>
        <TabListItemUrl>{tabUriValue}</TabListItemUrl>
        <TabListItemDebug>{tabId}</TabListItemDebug>
        <TabCloseButton
          accessibilityLabel={'Close this tab'}
          onPress={() => {
            setBrowserTabs(removeTab(tabId, browserTabs));
          }}>
          <TabCloseIcon />
        </TabCloseButton>
      </TabListItem>
    );
  };

  return (
    <>
      <BlurViewContainer blurType={IsDarkMode() ? 'dark' : 'light'} />
      <SafeAreaViewContainer>
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
              setBrowserTabs(newTab('https://status.im/', browserTabs));
            }}>
            <NewTabButtonText>Add New Tab (Status)</NewTabButtonText>
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
      </SafeAreaViewContainer>
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

const SafeAreaViewContainer = styled(SafeAreaView).attrs(() => ({
  edges: ['right', 'left'],
}))`
  flex: 1;
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
  font-size: 32px;
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
  font-weight: 600;
  padding: 20px 20px 20px 20px;
`;
const TabListItemTitle = styled.Text`
  color: ${(props) => props.theme.colors.title};
  font-size: 24px;
  font-weight: 600;
  padding-bottom: 10px;
`;
const TabListItemUrl = styled.Text`
  color: ${(props) => props.theme.colors.text};
  font-size: 16px;
  font-weight: 400;
  opacity: 0.5;
  padding-bottom: 10px;
`;
const TabListItemDebug = styled.Text`
  color: ${(props) => props.theme.colors.text};
  opacity: 0.5;
  font-size: 8px;
  font-weight: 200;
  padding-bottom: 10px;
`;

const TabCloseButton = styled.Pressable`
  position: absolute;
  top: 15px;
  right: 15px;
  opacity: 0.25;
  /* border: 1px solid red; */
`;

const TabCloseIcon = styled(IconClose).attrs(() => ({
  height: 32,
  width: 32,
}))`
  /* border: 1px solid blue; */
`;

const NewTabButton = styled.Pressable.attrs({
  hitSlop: 15,
})`
  font-size: 16px;
  font-weight: 400;
  padding: 20px;
  background: #4f9b09;
`;

const NewTabButtonText = styled.Text`
  /* color: ${(props) => props.theme.colors.text}; */
  color: white;
  opacity: 1;
  font-size: 16px;
  font-weight: 600;
`;
