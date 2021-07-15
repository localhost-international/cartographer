import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

import { useRecoilValue } from 'recoil';

import { browserTabsState } from 'src/store';

import NavigationTextInput from 'src/components/Navigation/NavigationTextInput';
import NavigationButtons from 'src/components/Navigation/NavigationButtons';

export default function Navigation() {
  const browserTabs = useRecoilValue(browserTabsState);

  const hasTabs = browserTabs.tabs.length >= 1;

  return (
    <KeyboardAvoidingView enabled behavior="padding">
      <NavigationContainer>
        {hasTabs && <NavigationTextInput />}
        <NavigationButtons />
      </NavigationContainer>
    </KeyboardAvoidingView>
  );
}

const NavigationContainer = styled(SafeAreaView).attrs(() => ({
  edges: ['right', 'bottom', 'left'],
}))`
  background: ${(props) => props.theme.colors.background};
`;

const KeyboardAvoidingView = styled.KeyboardAvoidingView``;
