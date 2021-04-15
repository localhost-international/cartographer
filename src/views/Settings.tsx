import React, { useState, useEffect } from 'react'
import { FlatList, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import styled from 'styled-components/native'
import { BlurView } from '@react-native-community/blur'

import { isDarkMode } from 'src/utils/appearance'

import data from 'src/data/settings.json'


import { ethereum } from 'src/protocols/ethereum'


export default function Settings() {

  const [ethBalance, setEthBalance] = useState<string>('...');


  useEffect(() => {
    (async () => setEthBalance(await ethereum.balance()))()
  }, [])



  const screenNavigation = useNavigation()

  const goBack = () => screenNavigation.goBack()

  const renderItems = ({ item }: any) => {
    return (
      <ListItem>
        <ListItemTitle>{item.name}</ListItemTitle>
        <ListItemDesc>{item.description}</ListItemDesc>
      </ListItem>
    )
  }

  return (
    <>
      <BlurView
        blurType={isDarkMode() ? 'dark' : 'light'}
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          left: 0,
          top: 0
        }}
      />
      <Header>
        <HeaderText>Settings</HeaderText>
        <DebugText>Ethereum Balance: {ethBalance}</DebugText>
        <CloseButton onPress={goBack}>
          <CloseButtonText>Done</CloseButtonText>
        </CloseButton>
      </Header>
      <FlatListContainer
        data={data.settings}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItems}
      />
    </>
  )
}



const SafeAreaView = styled.SafeAreaView`
  flex: 1;
  background-color: ${props => props.theme.ui.background};
`

const Header = styled.View`
  background-color: ${props => props.theme.ui.background};
  padding: 20px 0;
`
const HeaderText = styled.Text`
  color: ${props => props.theme.colors.text};
  text-align: center;
  font-size: 24px;
  font-weight: bold;
`
const CloseButton = styled.TouchableOpacity.attrs((props) => ({
  color: 'red'
}))`
  position: absolute;
  top: 24px;
  right: 24px;
`
const CloseButtonText = styled.Text`
  color: ${props => props.theme.colors.text};
  font-size: 18px;
`

const FlatListContainer = styled(FlatList)`
  flex: 1;
  background-color: ${props => props.theme.ui.background};
`
const ListItem = styled.TouchableOpacity`
  padding-top: 15px;
  padding-right: 10px;
  padding-bottom: 15px;
  padding-left: 10px;
  border-bottom-color: ${props => props.theme.ui.icon};
  border-bottom-width: 1px;
`
const ListItemTitle = styled.Text`
  font-size: 18px;
  padding-bottom: 4px;
  color: ${props => props.theme.colors.text};
`
const ListItemDesc = styled.Text`
  font-size: 16px;
  color: ${props => props.theme.colors.text};
`

const DebugText = styled.Text`
  color: ${props => props.theme.colors.text};
  text-align: center;
  font-size: 12px;
`

