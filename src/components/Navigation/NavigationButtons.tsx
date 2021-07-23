import React from 'react';
import { useRecoilState } from 'recoil';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';

import { tabsState } from 'src/store';

import { newTab } from 'src/utils/tabs';

import IconArrowLeft from 'src/assets/icons/icon-arrow-left.svg';
import IconArrowRight from 'src/assets/icons/icon-arrow-right.svg';
import IconOptions from 'src/assets/icons/icon-options.svg';
import IconRefresh from 'src/assets/icons/icon-refresh.svg';
import IconTabs from 'src/assets/icons/icon-tabs.svg';
import IconAddTab from 'src/assets/icons/icon-add-document.svg';

import { ButtonIcon } from 'src/components/ButtonIcon';

import { useDeviceOrientation } from 'src/hooks/useOrientation';
import type { ORIENTATION } from 'src/hooks/useOrientation';

interface NavigationButtonContainerProps {
  orientation: ORIENTATION;
  hasTabs: boolean;
}

const NavigationButtons = () => {
  const screenNavigation = useNavigation();
  const orientation = useDeviceOrientation();

  const [browserTabs, setBrowserTabs] = useRecoilState(tabsState);

  const hasTabs =
    browserTabs.tabs.length >= 1 && browserTabs.activeTab.index !== null;

  const webViewReload = () => {
    if (browserTabs.tabs.length >= 1 && browserTabs.activeTab.index !== null) {
      browserTabs.tabs[browserTabs.activeTab.index].tabRef?.current?.reload();
    }
  };
  const webViewGoBack = () => {
    if (browserTabs.tabs.length >= 1 && browserTabs.activeTab.index !== null) {
      browserTabs.tabs[browserTabs.activeTab.index].tabRef?.current?.goBack();
    }
  };
  const webViewGoForward = () => {
    if (browserTabs.tabs.length >= 1 && browserTabs.activeTab.index !== null) {
      browserTabs.tabs[
        browserTabs.activeTab.index
      ].tabRef?.current?.goForward();
    }
  };

  const viewTabs = () => screenNavigation.navigate('Tabs');
  const viewSettings = () => screenNavigation.navigate('Settings');

  const navigationButtons = [
    {
      type: 'back',
      onPress: () => hasTabs && webViewGoBack(),
      iconImage: IconArrowLeft,
      accessibilityLabel: 'Go back',
    },
    {
      type: 'forward',
      onPress: () => hasTabs && webViewGoForward(),
      iconImage: IconArrowRight,
      accessibilityLabel: 'Go forward',
    },
    {
      type: 'tabs',
      onPress: () => viewTabs(),
      iconImage: IconTabs,
      accessibilityLabel: 'View tabs',
    },
    {
      type: 'add-tabs',
      onPress: () => {
        setBrowserTabs(newTab('https://cartographers.surge.sh/', browserTabs));
      },
      iconImage: IconAddTab,
      accessibilityLabel: 'Add a new tab',
    },
    {
      type: 'reload',
      onPress: () => hasTabs && webViewReload(),
      iconImage: IconRefresh,
      accessibilityLabel: 'Reload web-page',
    },
    {
      type: 'options',
      onPress: () => viewSettings(),
      iconImage: IconOptions,
      accessibilityLabel: 'More Options',
    },
  ];

  return (
    <View orientation={orientation} hasTabs={browserTabs.tabs.length >= 1}>
      {navigationButtons.map((button) => {
        const { type, iconImage, accessibilityLabel, onPress } = button;
        return (
          <ButtonIcon
            type={type}
            key={`${button + type}`}
            accessibilityLabel={accessibilityLabel}
            onPress={onPress}
            iconImage={iconImage}
          />
        );
      })}
    </View>
  );
};

const View = styled.View<NavigationButtonContainerProps>`
  margin-left: 16px;
  margin-right: 16px;
  padding-top: 8px;
  padding-bottom: 8px;
  flex-direction: row;
  justify-content: space-between;

  ${(props) =>
    props.orientation === 'landscape' &&
    props.hasTabs &&
    `
    width: 38%;
    padding-top: 14px;
    justify-content: flex-start;
  `}
`;

export default NavigationButtons;
