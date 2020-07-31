import React from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  ListRenderItem
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import styled from 'styled-components/native'

import data from 'src/data/settings.json'


interface SettingsList {
  id: number
  name: string
  description: string
}


const View = styled.View`
  flex: 1;
`
const SafeAreaView = styled.SafeAreaView`
  flex: 1;
`
const CloseButton = styled.TouchableOpacity`
  border: 1px solid red;
  padding: 10px;
  align-self: flex-start;
`


export default function Settings() {

  const screenNavigation = useNavigation()

  const goBack = () => screenNavigation.goBack()


  const renderItems = ({ item }: any) => {
    return (
      <TouchableOpacity style={[styles.item]}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </TouchableOpacity>
    )
  }

  return (
    <>
      <SafeAreaView>
        <Text>Settings - Testing, testing, 1, 2, 3</Text>
        <FlatList
          data={data.settings}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItems}
        />
        {/* <CloseButton onPress={goBack}>
          <Text>Go Back</Text>
        </CloseButton> */}
      </SafeAreaView>
    </>
  )
}



const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
  },
  view: {
    flex: 1,
  },
  container: {
    flexGrow: 1
  },
  divider: {
    borderBottomColor: 'rgba(0,0,0,.35)',
    borderBottomWidth: 1,
  },
  item: {
    paddingTop: 15,
    paddingRight: 10,
    paddingBottom: 15,
    paddingLeft: 10,
    borderBottomColor: 'rgba(0,0,0,.25)',
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 16,
    paddingBottom: 4,
    color: 'rgba(0,0,0,1)',
  },
  description: {
    fontSize: 12,
    color: 'rgba(0,0,0,.35)',
  },
  textInput: {
    fontSize: 16,
    paddingTop: 15,
    paddingRight: 10,
    paddingBottom: 15,
    paddingLeft: 10,
  },
  button: {
  }
});