/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component, Fragment } from 'react';
import AppNavigator from 'src/AppNavigator';

// Hide known warnings during development
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings([
  'Warning: componentWillUpdate is deprecated',  
]);

const App = () => {
  return (
    <AppNavigator />
  );
};

export default App;
