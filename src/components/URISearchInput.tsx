import React, { Component } from 'react'
import { AppRegistry, View, TextInput, StyleSheet } from 'react-native'
import { SearchBar } from 'react-native-elements'

interface Props {}
export class URISearchInput extends Component {

  onSubmitEditing() {
    console.log('Do that thang')
  }

  render() {
    return (
      <TextInput 
        placeholder='http://status.im/'
        style={styles.uriInput} 
        onChangeText={(text) => this.setState({ text })}
        autoCapitalize='none' 
        onChange={(event) => {
          //this.searchChange(event.nativeEvent.text)
        }}
        returnKeyType='search'
        autoFocus={false}
        onSubmitEditing={this.onSubmitEditing}
        clearButtonMode='while-editing'
        selectionColor='rgba(0,0,255,.85)'
      />
    )
  }
}

const styles = StyleSheet.create({
  uriInput: {
    fontSize: 20,
    textAlign: 'left',
    //height: 32,
    marginTop: -15, // This doesn't feel right?
    padding: 4,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,.25)',
    backgroundColor: 'rgba(255,255,255,.95)',
  },
})