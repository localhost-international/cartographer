import React, { useState, useEffect } from 'react';
import styled, { useTheme } from 'styled-components/native';

import { useRecoilState, useSetRecoilState } from 'recoil';
import Share from 'react-native-share';

import { browserGlobalState, tabsState } from 'src/store';

import { IsDarkMode } from 'src/utils/appearance';
import { upgradeUrl } from 'src/utils/url';

import IconShare from 'src/assets/icons/icon-share.svg';

import { useDeviceOrientation } from 'src/hooks/useOrientation';

interface AddressBarContainerProps {
  orientation: any;
}

export const AddressBar = () => {
  const theme = useTheme();
  const orientation = useDeviceOrientation();

  const [browserTabs, setBrowserTabs] = useRecoilState(tabsState);
  const setBrowserState = useSetRecoilState(browserGlobalState);
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

  const onFocus = () => {
    shareVisibility(false);
    setBrowserState((previous) => {
      return {
        ...previous,
        addressBar: {
          focused: true,
        },
      };
    });
  };

  const onBlur = () => {
    // TODO - Re-instate previous URL on before onSubmitEditing
    shareVisibility(true);
    setBrowserState((previous) => {
      return {
        ...previous,
        addressBar: {
          focused: false,
        },
      };
    });
  };

  useEffect(() => {
    console.log('Orientation', orientation);
  }, [orientation]);

  return (
    <AddressBarContainer orientation={orientation}>
      <AddressBarTextInput
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
        onFocus={onFocus}
        onBlur={onBlur}
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
    </AddressBarContainer>
  );
};

const AddressBarContainer = styled.View<AddressBarContainerProps>`
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 6px;
  background-color: ${(props) => props.theme.addressBar.background};
  ${(props) =>
    props.orientation === 'landscape' &&
    `
    width: 60%;
    margin-left: 0;
    margin-right: 0;
  `}
`;
const AddressBarTextInput = styled.TextInput`
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
