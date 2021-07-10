import React, { useEffect } from 'react';
import styled from 'styled-components/native';

import { useRecoilValue } from 'recoil';

import NavigationTextInput from 'src/components/Navigation/NavigationComboInput';
import NavigationButtons from 'src/components/Navigation/NavigationButtons';

import { browserTabsState } from 'src/store';

export default function Navigation() {
  const browserTabs = useRecoilValue(browserTabsState);

  useEffect(() => {
    console.log('Active Tab ID', browserTabs.activeTabId);
  }, [browserTabs.activeTabId]);

  return (
    <NavigationContainer>
      <Button
        onPress={() => {
          browserTabs.activeTabRef?.current?.reload();
        }}>
        <ButtonText>Debug</ButtonText>
      </Button>
      <NavigationTextInput />
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

/////

const Button = styled.Pressable`
  background: blue;
  color: white;
  padding: 20px;
`;
const ButtonText = styled.Text`
  color: white;
  font-weight: 500;
`;
