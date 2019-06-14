import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
} from 'react-native';


export default class About extends Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>
          Cartographer
        </Text>
        <Text style={styles.small}>
          Hacked together by Leslie Owusu-Appiah
        </Text>
        <Button title="Browser" onPress={ () => navigate('Browser') } />
        <Button title="Settings" onPress={ () => navigate('Settings')} />
        <Button title="Intro" onPress={ () => navigate('Intro')} />
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
  heading: {
    fontSize: 30,
    paddingTop: 15,
    paddingBottom: 15,
  },
  small: {
    fontSize: 12,
    paddingTop: 15,
    paddingBottom: 30,
  }
});