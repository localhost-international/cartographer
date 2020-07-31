import React from 'react'
import { SafeAreaView } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import styled from 'styled-components/native'

import { AppState } from 'src/store/reducers'


import IconArrowLeft from 'src/assets/icons/icon-arrow-left.svg'
import IconArrowRight from 'src/assets/icons/icon-arrow-right.svg'
import IconOptions from 'src/assets/icons/icon-options.svg'
import IconRefresh from 'src/assets/icons/icon-refresh.svg'
import IconTabs from 'src/assets/icons/icon-tabs.svg'

interface IconProps {
  type: string
}

const iconSize = 32


const View = styled.View`
  /*border: 1px solid red;*/
  margin-left: 16px;
  margin-right: 16px;
  padding-top: 8px;
  padding-bottom: 0px;
  flex-direction: row;
  justify-content: space-between;
`
const Icon = styled.TouchableOpacity`
  /*border: 1px solid red;*/
  height: ${iconSize}px;
  padding-top: 0;
  padding-right: 10px;
  padding-bottom: 0;
  padding-left: 10px;
  ${({ type }: IconProps) => type === 'tabs' && ``}
  ${({ type }: IconProps) => type === 'reload' && ``}
  ${({ type }: IconProps) => type === 'options' && ``}
`


export default function NavigationButtons() {

  const screenNavigation = useNavigation()

  const navigation = useSelector((state: AppState) => state.navigation)
  const dispatch = useDispatch()

  const webViewReload = () => navigation.webViewRef.current?.reload()
  // TODO - Check if you can go back/forward and disable button
  const webViewGoBack = () => navigation.webViewRef.current?.goBack()
  const webViewGoForward = () => navigation.webViewRef.current?.goForward()

  const viewSettings = () => screenNavigation.navigate('Settings')


  return (
    <SafeAreaView>
      <View>
        <Icon type={`back`} onPress={webViewGoBack}>
          <IconArrowLeft height={iconSize} />
        </Icon>
        <Icon type={`forward`} onPress={webViewGoForward}>
          <IconArrowRight height={iconSize} />
        </Icon>
        <Icon type={`tabs`}>
          <IconTabs height={iconSize} />
        </Icon>
        <Icon type={`reload`} onPress={webViewReload}>
          <IconRefresh height={iconSize} />
        </Icon>
        <Icon type={`options`}>
          <IconOptions height={iconSize} onPress={viewSettings} />
        </Icon>
      </View>
    </SafeAreaView>
  )
}
