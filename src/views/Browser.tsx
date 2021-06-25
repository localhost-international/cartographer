import React from 'react';
import styled from 'styled-components/native';

import BrowserWebView from 'src/components/BrowserWebView';
import Navigation from 'src/components/Navigation';

export default function Browser() {
  return (
    <>
      <KeyboardAvoidingView enabled behavior="padding">
        <View>
          <BrowserWebView />
          <Navigation />
        </View>
      </KeyboardAvoidingView>
    </>
  );
}

const View = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
`;
const KeyboardAvoidingView = styled.KeyboardAvoidingView`
  flex: 1;
`;
