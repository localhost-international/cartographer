import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Button,
  SectionList,
  FlatList,
  ListView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import { withNavigation } from 'react-navigation';

const settings = [
  { name: 'Search Engine', link: '', desc: '' },
  { name: 'Protocols', link: '', desc: 'Enable or disable IPFS, DAT, I2P and many others' },
  { name: 'Passcode/Face ID', link: '', desc: '' },
  { name: 'Privacy and Security', link: '', desc: '' },
  { name: 'Help', link: '', desc: '' },
  { name: 'About', link: 'About', desc: 'Who built this?' },
]






class Settings extends Component {

  render() {

    const { navigate } = this.props.navigation;
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.view}>
          <ScrollView>
            {
              settings.map((setting, index) => {
                const { name, link } = setting
                return (
                  <TouchableOpacity
                    style={styles.container}
                    key={index}
                    onPress={() => {
                      if (link.length) navigate(link)
                    }}
                  >
                    <View className={styles.settingsItem}>
                      <Text className={styles.settingsText}>
                        {name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )
              })
            }
          </ScrollView>
        </View>
      </SafeAreaView>
    )
  }
};



const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,1)',
  },
  view: {
    flex: 1,
  },
  container: {
    padding: 15,
    marginTop: 3,
    backgroundColor: 'rgba(255,255,255,1)',
    alignItems: 'flex-start',
    fontSize: 28,
  },

  settingsItem: {
    fontSize: 18,
    textAlign: 'left',
    padding: 8,
    backgroundColor: 'rgba(223,228,231,1)',
  },
  settingsText: {
    textAlign: 'left',
    padding: 8,
    backgroundColor: 'rgba(223,228,231,1)',
  }
});


export default withNavigation(Settings);