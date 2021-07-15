import React, { useState } from 'react';
import styled, { useTheme } from 'styled-components/native';

import Share from 'react-native-share';

import { IsDarkMode } from 'src/utils/appearance';
import { upgradeUrl } from 'src/utils/url';

import IconShare from 'src/assets/icons/icon-share.svg';
import { useRecoilState } from 'recoil';

import { browserTabsState } from 'src/store';

// import { getIndexByTabId } from 'src/utils/tabs';

const AddressTextInput = () => {
  const theme = useTheme();
  const [browserTabs, setBrowserTabs] = useRecoilState(browserTabsState);
  const [shareVisible, shareVisibility] = useState(true);

  const shareCurrentUri = () => {
    if (browserTabs.activeTab.index !== null) {
      const sharingMessage =
        browserTabs.tabs[browserTabs.activeTab.index].tabTitle;
      const sharingUri =
        browserTabs.tabs[browserTabs.activeTab.index].tabUriValue;
      const shareOptions = {
        title: 'Share',
        message: `${sharingMessage}`,
        url: sharingUri,
      };
      Share.open(shareOptions)
        .then((resp) => {
          console.log('Share successful', resp);
        })
        .catch((err) => {
          console.log('Share error', err);
        });
    }
  };

  return (
    <AddressBar>
      <URLSearchInput
        value={
          browserTabs.activeTab.index !== null
            ? browserTabs.tabs[browserTabs.activeTab.index].tabUriValue
            : ''
        }
        onChangeText={(url: string) => {
          setBrowserTabs((previous) => {
            if (previous.activeTab.index !== null) {
              previous.tabs[previous.activeTab.index].tabUriValue = url;
            }
            return {
              ...previous,
            };
          });
        }}
        onSubmitEditing={(event) => {
          const urlCurrent = upgradeUrl(event.nativeEvent.text);
          setBrowserTabs((previous) => {
            if (previous.activeTab.index !== null) {
              previous.tabs[previous.activeTab.index].tabUriValue = urlCurrent;
              previous.tabs[previous.activeTab.index].tabUriCurrent = {
                uri: urlCurrent,
              };
            }
            return {
              ...previous,
            };
          });
        }}
        onFocus={() => {
          shareVisibility(false);
        }}
        onBlur={() => {
          // TODO - Re-instate previous URL on before onSubmitEditing
          shareVisibility(true);
        }}
        autoCapitalize="none"
        autoCompleteType="off"
        autoCorrect={false}
        returnKeyType="go"
        blurOnSubmit={true}
        clearButtonMode="while-editing"
        keyboardAppearance={IsDarkMode() ? 'dark' : 'light'}
        // TODO - Change keyboard type to search if URL not detected
        keyboardType="web-search"
        selectTextOnFocus={true}
        textContentType="URL"
      />
      {shareVisible && (
        <Icon onPress={shareCurrentUri}>
          <IconShare height={24} width={40} fill={theme.ui.icon} />
        </Icon>
      )}
    </AddressBar>
  );
};

const AddressBar = styled.View`
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 6px;
  background-color: ${(props) => props.theme.addressBar.background};
`;
const URLSearchInput = styled.TextInput`
  font-size: 18px;
  text-align: left;
  padding: 10px;
  color: ${(props) => props.theme.addressBar.color};
`;
const Icon = styled.Pressable.attrs({
  hitSlop: 10,
})`
  /*border: 1px solid rgba(255,0,0,.5);*/
  right: -8px;
  text-align: right;
  position: absolute;
  padding-top: 7.5px;
  margin-right: 8px;
  padding-bottom: 7.5px;
  margin-left: 8px;
  color: ${(props) => props.theme.addressBar.color};
`;

export default AddressTextInput;
