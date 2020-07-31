import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components/native'

import { AppState } from 'src/store/reducers'
import { URL_INPUT, URL_CURRENT } from 'src/store/navigation.actions'


const TextInput = styled.TextInput`
  font-size: 18px;
  text-align: left;
  padding: 10px;
  color: black;
  border-width: 1px;
  border-color: rgba(0,0,0,.5);
`


export default function AddressTextInput() {

  const navigation = useSelector((state: AppState) => state.navigation)
  const dispatch = useDispatch()

  return (
    <TextInput
      value={navigation.urlInput}
      onChangeText={(url: string) => {
        dispatch({ type: URL_INPUT, urlInput: url })
      }}
      onSubmitEditing={(event) => {
        dispatch({ type: URL_CURRENT, urlCurrent: event.nativeEvent.text })
      }}
      onFocus={() => { }}
      onBlur={() => { }}
      autoCapitalize="none"
      autoCompleteType="off"
      autoCorrect={false}
      returnKeyType="go"
      blurOnSubmit={true}
      clearButtonMode="while-editing"
      keyboardAppearance="light"
      keyboardType="web-search"
      returnKeyLabel="go"
      selectTextOnFocus={true}
      textContentType="URL"
    />
  )
}