import React from 'react';
import { SafeAreaView } from 'react-native';
import { useRecoilState } from 'recoil';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';

import { navigationState } from 'src/store/atoms';

import IconArrowLeft from 'src/assets/icons/icon-arrow-left.svg';
import IconArrowRight from 'src/assets/icons/icon-arrow-right.svg';
import IconOptions from 'src/assets/icons/icon-options.svg';
import IconRefresh from 'src/assets/icons/icon-refresh.svg';
import IconTabs from 'src/assets/icons/icon-tabs.svg';

import { ButtonIcon } from 'src/components/ButtonIcon';

const NavigationButtons = () => {
  const screenNavigation = useNavigation();

  const [navState] = useRecoilState(navigationState);

  const webViewReload = () => navState.webViewRef?.current?.reload();
  const webViewGoBack = () => navState.webViewRef?.current?.goBack();
  const webViewGoForward = () => navState.webViewRef?.current?.goForward();
  const viewTabs = () => screenNavigation.navigate('Tabs');
  const viewSettings = () => screenNavigation.navigate('Settings');

  const navigationButtons = [
    {
      type: 'back',
      onPress: () => webViewGoBack(),
      iconImage: IconArrowLeft,
      accessibilityLabel: 'Go back',
    },
    {
      type: 'forward',
      onPress: () => webViewGoForward(),
      iconImage: IconArrowRight,
      accessibilityLabel: 'Go forward',
    },
    {
      type: 'tabs',
      onPress: () => viewTabs(),
      iconImage: IconTabs,
      accessibilityLabel: 'List opened web-site tabs',
    },
    {
      type: 'reload',
      onPress: () => webViewReload(),
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
    <SafeAreaView>
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
    </SafeAreaView>
  );
};

const View = styled.View`
  margin-left: 16px;
  margin-right: 16px;
  padding-top: 8px;
  padding-bottom: 8px;
  flex-direction: row;
  justify-content: space-between;
`;

export default NavigationButtons;
