import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components/native'

import { AppState } from 'src/store/reducers'
import { URL_INPUT, URL_CURRENT } from 'src/store/navigation.reducer'

import { isDarkMode } from 'src/utils/appearance'
import { upgradeUrl } from 'src/utils/url'


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


export default function AddressTextInput() {

  const navigation = useSelector((state: AppState) => state.navigation)
  const dispatch = useDispatch()

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
        onFocus={() => { }}
        onBlur={() => { }}
        autoCapitalize="none"
        autoCompleteType="off"
        autoCorrect={false}
        returnKeyType="go"
        blurOnSubmit={true}
        clearButtonMode="while-editing"
        keyboardAppearance={ isDarkMode() ? 'dark' : 'light'}
        keyboardType="web-search"
        returnKeyLabel="go"
        selectTextOnFocus={true}
        textContentType="URL"
      />
    </AddressBar>
  )
}