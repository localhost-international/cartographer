/**
 * https://github.com/facebook/react-native
 * https://github.com/emin93/react-native-template-typescript
 * 
 * @format
 */

import React, { Component } from 'react'
import { 
  ViewPropTypes,
  Platform, 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  TextInput
} from 'react-native'

import 'react-native-vector-icons'

import { BrowserView } from './views/BrowserView'
import { URISearchInput } from './components/URISearchInput'

// TODO - Fix me
//import { SearchBar } from 'react-native-elements'

//const platform = Platform.select({ios: `iOS`, android: `Android`})


interface Props {}
export default class App extends Component<Props> {
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <BrowserView />
          <URISearchInput />
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
