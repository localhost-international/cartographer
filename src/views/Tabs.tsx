import React, { useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import { BlurView } from '@react-native-community/blur';

import { IsDarkMode } from 'src/utils/appearance';

type Tab = {
  tabIndex: number;
  tabTitle: string;
  tabUrl: string;
  tabThumbnail: string;
  tabRef: any;
};
type Tabs = Tab[];

const dummyTabs: Tabs = [
  {
    tabIndex: 0,
    tabTitle: 'Catalog',
    tabUrl: 'https://beta.catalog.works/omarijazz/',
    tabThumbnail: '',
    tabRef: null,
  },
  {
    tabIndex: 1,
    tabTitle: 'Foundation',
    tabUrl: 'https://foundation.app/leslie/',
    tabThumbnail: '',
    tabRef: null,
  },
  {
    tabIndex: 1,
    tabTitle: 'Mirror',
    tabUrl: 'https://foundation.app/leslie/',
    tabThumbnail: '',
    tabRef: null,
  },
];

const _renderItem: any = ({ item }: { item: Tab }) => {
  const { tabIndex, tabTitle, tabUrl } = item;
  return (
    <TabListItem
      key={tabIndex}
      onPress={() => {
        Alert.alert(
          'Debug - Open Tab',
          'TODO - Tab opening',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: 'OK',
              onPress: () => console.log('OK Pressed'),
            },
          ],
          { cancelable: false },
        );
      }}>
      <TabListItemTitle>{tabTitle}</TabListItemTitle>
      <TabListItemUrl>{tabUrl}</TabListItemUrl>
    </TabListItem>
  );
};

export default function Tabs() {
  const screenNavigation = useNavigation();

  const [searchTabs, setSearchTabs] = useState('');

  const goBack = () => screenNavigation.goBack();

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
        <TabList
          data={dummyTabs}
          renderItem={_renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
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
