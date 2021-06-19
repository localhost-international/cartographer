import React, { useState, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled, { useTheme } from 'styled-components/native'

import Share from 'react-native-share'

import { AppState } from 'src/store/reducers'
import { URL_INPUT, URL_CURRENT } from 'src/store/navigation.reducer'

import { isDarkMode } from 'src/utils/appearance'
import { upgradeUrl } from 'src/utils/url'

import IconShare from 'src/assets/icons/icon-share.svg'



const AddressTextInput = () => {

  const theme = useTheme()

  const navigation = useSelector((state: AppState) => state.navigation)
  const dispatch = useDispatch()

  const [shareVisible, shareVisibility] = useState(true)

  const shareCurrentUri = () => {
    const shareOptions = {
      title: 'Share',
      message: `Sharing: ${navigation.webViewState.title}`,
      url: navigation.webViewState.url
    }
    Share.open(shareOptions)
      .then((resp) => { console.log('Share successful', resp) })
      .catch((err) => { console.log('Share error', err) })
  }

  return (
    <AddressBar>
      <TextInput
        value={navigation.urlInput}
        onChangeText={(url: string) => {
          dispatch({ type: URL_INPUT, urlInput: url })
        }}
        onSubmitEditing={(event) => {
          const urlCurrent = upgradeUrl(event.nativeEvent.text)
          dispatch({ type: URL_INPUT, urlInput: urlCurrent })
          dispatch({ type: URL_CURRENT, urlCurrent: urlCurrent })
        }}
        onFocus={() => {
          shareVisibility(false)
        }}
        onBlur={(event) => {
          // TODO - Re-instate previous URL on before onSubmitEditing
          shareVisibility(true)
        }}
        autoCapitalize="none"
        autoCompleteType="off"
        autoCorrect={false}
        returnKeyType="go"
        blurOnSubmit={true}
        clearButtonMode="while-editing"
        keyboardAppearance={isDarkMode() ? 'dark' : 'light'}
        keyboardType="web-search"
        returnKeyLabel="go"
        selectTextOnFocus={true}
        textContentType="URL"
      />
      {
        shareVisible &&
        <Icon onPress={shareCurrentUri}>
          <IconShare height={24} width={40} fill={theme.ui.icon} />
        </Icon>
      }
    </AddressBar>
  )
}



const AddressBar = styled.View`
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 6px;
  background-color: ${props => props.theme.addressBar.background};
`
const TextInput = styled.TextInput`
  font-size: 18px;
  text-align: left;
  padding: 10px;
  color: ${props => props.theme.addressBar.color};
`
const Icon = styled.TouchableOpacity`
  /*border: 1px solid rgba(255,0,0,.5);*/
  right: -8px;
  text-align: right;
  position: absolute;
  padding-top: 7.5px;
  margin-right: 8px;
  padding-bottom: 7.5px;
  margin-left: 8px;
  color: ${props => props.theme.addressBar.color};
`



export default AddressTextInput