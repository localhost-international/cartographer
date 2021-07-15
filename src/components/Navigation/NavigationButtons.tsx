import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRecoilState } from 'recoil';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';

import { browserTabsState } from 'src/store';

import { newTab } from 'src/utils/tabs';
import { randomSite } from 'src/utils/debug';

import IconArrowLeft from 'src/assets/icons/icon-arrow-left.svg';
import IconArrowRight from 'src/assets/icons/icon-arrow-right.svg';
import IconOptions from 'src/assets/icons/icon-options.svg';
import IconRefresh from 'src/assets/icons/icon-refresh.svg';
import IconTabs from 'src/assets/icons/icon-tabs.svg';
import IconAddTab from 'src/assets/icons/icon-add-document.svg';

import { ButtonIcon } from 'src/components/ButtonIcon';

const NavigationButtons = () => {
  const screenNavigation = useNavigation();

  const [browserTabs, setBrowserTabs] = useRecoilState(browserTabsState);

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
        const previousTabs = browserTabs;
        const randomUri = randomSite();
        setBrowserTabs(newTab(randomUri, previousTabs));
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
    <SafeAreaViewContainer>
      {/* <SafeAreaView> */}
      <View>
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
      {/* </SafeAreaView> */}
    </SafeAreaViewContainer>
  );
};

const SafeAreaViewContainer = styled(SafeAreaView).attrs(() => ({
  edges: ['bottom', 'right', 'left'],
}))``;

const View = styled.View`
  margin-left: 16px;
  margin-right: 16px;
  padding-top: 8px;
  padding-bottom: 8px;
  flex-direction: row;
  justify-content: space-between;
`;

export default NavigationButtons;
