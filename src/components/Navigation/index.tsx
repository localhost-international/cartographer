import React from 'react';
import styled from 'styled-components/native';

import { useRecoilValue } from 'recoil';

import { browserTabsState } from 'src/store';

import NavigationTextInput from 'src/components/Navigation/NavigationComboInput';
import NavigationButtons from 'src/components/Navigation/NavigationButtons';

export default function Navigation() {
  const browserTabs = useRecoilValue(browserTabsState);

  const hasTabs = browserTabs.tabs.length >= 1;

  return (
    <NavigationContainer>
      {hasTabs && <NavigationTextInput />}
      <NavigationButtons />
    </NavigationContainer>
  );
}

const NavigationContainer = styled.View`
  position: absolute;
  top: auto;
  right: 20px;
  bottom: 20px;
  left: 20px;
  display: flex;
  background: ${(props) => props.theme.colors.background};
`;
