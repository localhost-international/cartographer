import React, { Component } from 'react'
import { 
  AppRegistry, 
  View, 
  TextInput, 
  StyleSheet,
  Button,
} from 'react-native'


// type Props = { uri: string }
export class ComboInput extends Component {

  onSubmitEditing() {
    console.log('Do that thang')
  }
  onChangeText() {
    console.log('Do nada')
  }

  render() {
    return (
      <View style={styles.view}>
        <TextInput 
          style={styles.textInput} 
          placeholder={this.props.uri}
          //onChangeText={(text) => this.setState({ text })}
          autoCapitalize='none' 
          onChange={this.onChangeText}
          returnKeyType='search'
          autoFocus={false}
          onSubmitEditing={this.onSubmitEditing}
          //clearButtonMode='while-editing'
          selectionColor='rgba(0,0,255,.85)'
        />
      </View>
    )
  }
}

const styleVars = {
  container: {
    padding: 12
  }
}

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    //backgroundColor: 'rgba(255,255,255,.5)',
    //borderTopColor: 'rgba(0,0,0,.05)',
  },
  textInput: {
    flex: 1,
    fontSize: 18,
    textAlign: 'left',
    padding: 8,
    backgroundColor: 'rgba(223,228,231,1)',
    //borderWidth: 1,
    //borderColor: 'rgba(0,0,0,.25)',
  },
});

