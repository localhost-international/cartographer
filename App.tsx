/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Text } from 'react-native';

import AppNavigator from './src/AppNavigator';


export interface State {
  fontLoaded: boolean  
}

export default class App extends Component<{}, State> {

  constructor(props) {
		super(props);
		this.state = {
			fontLoaded: true, // false
		}
	}

  async componentDidMount() {

  }

  render() {
    return (
      <>
      {
        this.state.fontLoaded ? (
          <AppNavigator />
        ) : null
      }
      </>
    )
  }

}