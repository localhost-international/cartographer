import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRecoilState } from 'recoil';
import { useNavigation } from '@react-navigation/native';
import styled, { useTheme } from 'styled-components/native';
import { BlurView } from '@react-native-community/blur';

import { IsDarkMode } from 'src/utils/appearance';

import { tabsState } from 'src/store';
import type { TabState } from 'src/store';

import { newTab, switchTab, removeTab, closeAllTabs } from 'src/utils/tabs';
import { randomSite } from 'src/utils/debug';

import IconClose from 'src/assets/icons/icon-close-filled.svg';
import IconAdd from 'src/assets/icons/icon-add.svg';

interface TabListItemProps {
  noTabs?: boolean;
}

export default function Tabs() {
  const theme = useTheme();
  const screenNavigation = useNavigation();

  const [browserTabs, setBrowserTabs] = useRecoilState(tabsState);
  const [filteredBrowserTabs, setFilteredBrowserTabs] = useState<TabState[]>(
    browserTabs.tabs,
  );
  const [searchTabs, setSearchTabs] = useState<string>('');

  const goBack = () => screenNavigation.goBack();

  const _renderItem: any = ({ item }: { item: TabState }) => {
    const { tabId, tabTitle, tabUriValue } = item;
    return (
      <TabListItem
        key={tabId}
        onPress={() => {
          setBrowserTabs(switchTab(tabId, browserTabs));
          goBack();
        }}>
        <TabListItemTitle>{tabTitle ? tabTitle : tabUriValue}</TabListItemTitle>
        <TabListItemUrl>{tabUriValue}</TabListItemUrl>
        <TabListItemDebug>{tabId}</TabListItemDebug>
        <TabCloseButton
          accessibilityLabel={'Close this tab'}
          onPress={() => {
            setBrowserTabs(removeTab(tabId, browserTabs));
            if (browserTabs.tabs.length === 1) {
              goBack();
            }
          }}>
          <TabCloseIcon />
        </TabCloseButton>
      </TabListItem>
    );
  };

  const searchTabsFilter = (query: string) => {
    if (query) {
      const newData = browserTabs.tabs.filter((item) => {
        const itemData = item.tabTitle
          ? item.tabTitle.toLocaleLowerCase()
          : ''.toLocaleLowerCase();
        const textData = query.toLocaleLowerCase();
        console.log('\n\n\n', itemData.indexOf(textData) > -1);
        return itemData.indexOf(textData) > -1;
      });
      console.log('\n\n\n\nSearch Filter - item:', newData, query, '\n\n\n\n');
      setFilteredBrowserTabs(newData);
      setSearchTabs(query);
    } else {
      setFilteredBrowserTabs(browserTabs.tabs);
      setSearchTabs(query);
    }
  };

  const closeTabs = () => {
    const tabs = browserTabs.tabs;
    if (tabs.length >= 1) {
      Alert.alert(
        'Close all tabs',
        `Do you want to close ${tabs.length} tabs?`,
        [
          {
            text: 'Cancel',
            onPress: () => {
              console.log('Cancel Pressed');
            },
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => {
              setBrowserTabs(closeAllTabs(browserTabs));
            },
          },
        ],
      );
    }
  };

  useEffect(() => {
    setFilteredBrowserTabs(browserTabs.tabs);
  }, [browserTabs.tabs]);

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
            placeholder="Search by tab title"
            value={searchTabs}
            onChangeText={(query: string) => {
              searchTabsFilter(query);
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
          {browserTabs.tabs.length ? (
            <TabList
              data={filteredBrowserTabs}
              renderItem={_renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          ) : (
            <TabListItem noTabs>
              <TabListItemTitle>No tabs open</TabListItemTitle>
            </TabListItem>
          )}
        </Body>
        <FooterContainer>
          <Footer>
            <ButtonContainer
              onPress={() => {
                closeTabs();
              }}>
              <ButtonText>Close All</ButtonText>
            </ButtonContainer>
            <ButtonContainer
              onPress={() => {
                setBrowserTabs(
                  newTab('https://cartographers.surge.sh/', browserTabs),
                );
              }}>
              <IconAdd height={30} width={30} fill={theme.ui.icon} />
            </ButtonContainer>
            <ButtonContainer
              onPress={() => {
                const randomUri = randomSite();
                setBrowserTabs(newTab(randomUri, browserTabs));
              }}>
              <ButtonText>Random</ButtonText>
            </ButtonContainer>
          </Footer>
        </FooterContainer>
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
  ${({ noTabs }: TabListItemProps) =>
    noTabs === true &&
    `
      border-bottom-width: 0;
      padding-bottom: 10px;
      opacity: .5;
   `}
`;
const TabListItemTitle = styled.Text`
  color: ${(props) => props.theme.colors.title};
  font-size: 20px;
  font-weight: 600;
  margin-right: 40px;
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

const FooterContainer = styled.View`
  /* border: 1px solid red; */
  background-color: ${(props) => props.theme.ui.background};
`;
const Footer = styled(SafeAreaView).attrs(() => ({
  edges: ['right', 'left', 'bottom'],
}))`
  /* border: 1px solid red; */
  margin-left: 16px;
  margin-right: 16px;
  padding-top: 8px;
  padding-bottom: 8px;
  flex-direction: row;
  justify-content: space-between;
`;

const ButtonContainer = styled.Pressable.attrs({
  hitSlop: 10,
})``;
const ButtonText = styled.Text`
  color: ${(props) => props.theme.colors.text};
  font-size: 18px;
  padding-top: 5px;
  opacity: 0.5;
`;
