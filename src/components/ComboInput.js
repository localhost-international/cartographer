import React, { Component } from 'react'
import {
  View,
  TextInput,
  StyleSheet,
  TouchableHighlight,
  Text,
} from 'react-native'

import { Consumer } from '../utils/context';


export class ComboInput extends Component {

  constructor(props) {
    super(props);
    this.state = {
      url: '',
    };
  };

  onSubmitEditing() {
    console.log('Do that thang')
  }
  onChangeText() {
    console.log('Do nada')
  }

  render() {
    return (
      <Consumer>
        {({ urlCurrent, urlUpdate }) => {

          return (
            <View style={styles.view}>
              <TextInput
                style={styles.textInput}
                placeholder={ this.state.url }
                value={ this.state.url } 
                placeholder={ urlCurrent }
                spellCheck={false}
                autoCapitalize="none"
                // onChange={ this.onChangeText }
                returnKeyType="search"
                autoCorrect={ false } 
                autoFocus={false}
                onSubmitEditing={
                  (evt) => {
                    let value = evt.nativeEvent.text;
                    console.log('onSubmitEditing', value);
                    urlUpdate(value);
                  }
                }
                selectionColor='rgba(0,0,255,.85)'
                onChangeText={
                  (address) => {
                    console.log('onChangeText', address);
                    this.setState({ url: address });
                  }
                }

                // onEndEditing={}
              />

              {/* <TouchableHighlight onPress={this.onSubmitEdit}>
                <Text>Go</Text>
              </TouchableHighlight> */}

            </View>
          )

        }}
      </Consumer>
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

