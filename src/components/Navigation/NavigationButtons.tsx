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



const View = styled.View`
  margin-left: 16px;
  margin-right: 10px;
  padding-top: 8px;
  padding-bottom: 0px;
  flex-direction: row;
  justify-content: space-between;
`
const Icon = styled.TouchableOpacity`
  width: 30px;
  height: 30px;
  margin-left: 2.5px;
  margin-right: 2.5px;
  ${({ type }: IconProps) => type === 'tabs' && `margin-top: 4px;`}
  ${({ type }: IconProps) => type === 'reload' && `margin-top: 4px;`}
  ${({ type }: IconProps) => type === 'options' && `margin-top: 4px;`}
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
          <IconArrowLeft width={22} height={29} />
        </Icon>
        <Icon type={`forward`} onPress={webViewGoForward}>
          <IconArrowRight width={22} height={29} />
        </Icon>
        <Icon type={`tabs`}>
          <IconTabs width={25} height={23} />
        </Icon>
        <Icon type={`reload`} onPress={webViewReload}>
          <IconRefresh width={28} height={24} />
        </Icon>
        <Icon type={`options`}>
          <IconOptions width={24} height={24} onPress={viewSettings} />
        </Icon>
      </View>
    </SafeAreaView>
  )
}
