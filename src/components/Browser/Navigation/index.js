import React, { Component } from 'react'
import {
  Platform,
  View,
  TextInput,
  StyleSheet,
  TouchableHighlight,
  Text,
  ProgressViewIOS,
  ProgressBarAndroid,
} from 'react-native'

import { Consumer } from 'src/utils/context';


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
        {({ urlSource, urlNew, urlUpdate }) => {

          return (
            <View style={ styles.view }>
              {
                (Platform.OS === 'ios') ?
                ( <ProgressViewIOS progress={ 50 } /> ) : 
                ( <ProgressBarAndroid styleAttr="horizontal" progress={ 50 } indeterminate={ false } /> )
              }
              <TextInput
                style={ styles.textInput }
                value={ urlNew } 
                placeholder={ urlSource }
                spellCheck={false}
                autoCapitalize="none" 
                returnKeyType="search"
                autoCorrect={ false } 
                autoFocus={false}
                onSubmitEditing={
                  (evt) => {
                    let value = evt.nativeEvent.text;
                    console.log('%conSubmitEditing', 'background: dodgerblue; color: white;');
                    console.log(
                      'value: ', value,
                      'urlSource: ', urlSource,
                      'urlNew', urlNew,
                    );
                    urlUpdate(value);
                  }
                }
                selectionColor='rgba(0,0,255,.85)'
                onChangeText={
                  (value) => {
                    console.log('onChangeText', value);
                    // urlUpdate(value);
                  }
                }
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

