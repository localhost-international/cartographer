import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { useRecoilValue } from 'recoil';

import { browserGlobalState, tabsState } from 'src/store';

import { AddressBar } from 'src/components/Navigation/AddressBar';
import { NavigationButtons } from 'src/components/Navigation/NavigationButtons';

import { useKeyboard } from 'src/hooks/useKeyboard';
import { useDeviceOrientation } from 'src/hooks/useOrientation';
import type { ORIENTATION } from 'src/hooks/useOrientation';

interface NavigationContainerProps {
  isKeyboardOpen?: boolean;
  orientation: ORIENTATION;
  hasTabs: boolean;
}

export default function Navigation() {
  const browserState = useRecoilValue(browserGlobalState);
  const browserTabs = useRecoilValue(tabsState);
  const orientation = useDeviceOrientation();
  const isKeyboardOpen = useKeyboard();

  const hasTabs = browserTabs.tabs.length >= 1;

  return (
    <KeyboardAvoidingView enabled behavior="position">
      <NavigationContainer
        isKeyboardOpen={isKeyboardOpen}
        orientation={orientation}
        hasTabs={hasTabs}
        edges={
          browserState.addressBar.focused
            ? ['right', 'left']
            : ['right', 'bottom', 'left']
        }>
        {hasTabs && <AddressBar />}
        {(orientation === 'landscape' ||
          (orientation === 'portrait' && !browserState.addressBar.focused)) && (
          <NavigationButtons />
        )}
      </NavigationContainer>
    </KeyboardAvoidingView>
  );
}

const NavigationContainer = styled(SafeAreaView)<NavigationContainerProps>`
  /* Debug Floating UI */
  /* opacity: .5;
  position: absolute;
  right: 20px;
  bottom: 20px;
  left: 20px; */

  background: ${(props) => props.theme.colors.background};
  ${(props) =>
    props.orientation === 'landscape' &&
    props.hasTabs &&
    `
    flex-direction: row;
  `}
`;

const KeyboardAvoidingView = styled.KeyboardAvoidingView``;
