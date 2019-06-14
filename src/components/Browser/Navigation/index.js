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
} from 'react-native';

import { withNavigation } from 'react-navigation';

import { Consumer } from 'src/utils/context';


// export class ComboInput extends Component {
class ComboInput extends Component {

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

    const { navigate } = this.props.navigation;

    return (
      <Consumer>
        {({ urlSource, urlNew, urlUpdate }) => {

          return (
            <View style={styles.view}>
              {
                (Platform.OS === 'ios') ?
                  (<ProgressViewIOS progress={50} />) :
                  (<ProgressBarAndroid styleAttr="horizontal" progress={50} indeterminate={false} />)
              }
              <TextInput
                style={styles.textInput}
                value={urlNew}
                placeholder={urlSource}
                spellCheck={false}
                autoCapitalize="none"
                returnKeyType="search"
                autoCorrect={false}
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
              <TouchableHighlight
                onPress={
                  () => {
                    console.log('Settings', this.props);
                    navigate('Settings');
                  }
                }
              >
                <Text style={styles.button}>⚙️</Text>
              </TouchableHighlight>
            </View>
          )
        }}
      </Consumer>
    )
  }
};


const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
  },
  textInput: {
    flex: 1,
    fontSize: 18,
    textAlign: 'left',
    padding: 8,
    backgroundColor: 'rgba(223,228,231,1)',
  },
  button: {
    fontSize: 30,
    textAlign: 'center',
    textAlignVertical: 'center',
    paddingRight: 10,
    paddingLeft: 10,
  }
});


export default withNavigation(ComboInput);




