import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
} from 'react-native';


export default class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Welcome to Cartograpther</Text>
        <Button 
          title="Start Browsing" 
          onPress={
            () => {
              this.props.navigation.navigate('BrowserScreen')
            }
          }
        />
      </View>
    )
  }
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});