import React from 'react';
import styled from 'styled-components/native';

// import NavigationTextInput from 'src/components/Navigation/NavigationComboInput';
import NavigationButtons from 'src/components/Navigation/NavigationButtons';

export default function Navigation() {
  return (
    <NavigationContainer>
      {/* <NavigationTextInput /> */}
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
