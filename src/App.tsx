import React from 'react';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import AppNavigator from 'src/AppNavigator';

import lightTheme from 'src/themes/light';
import darkTheme from 'src/themes/dark';

import { IsDarkMode } from 'src/utils/appearance';

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider theme={IsDarkMode() ? darkTheme : lightTheme}>
        <RecoilRoot>
          <AppNavigator />
        </RecoilRoot>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
