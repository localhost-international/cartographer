import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import styled from 'styled-components/native'
import { BlurView } from '@react-native-community/blur'

import { isDarkMode } from 'src/utils/appearance'
import { useTheme } from 'styled-components/native'

import { AppState } from 'src/store/reducers'

import { Ethereum } from 'src/protocols/ethereum'


import IconCurrencyEthereum from 'src/assets/icons/currencies/currency-ethereum.svg'


export default function Settings() {

  const theme = useTheme()

  const ethereumState = useSelector((state: AppState) => state.ethereum)

  const screenNavigation = useNavigation()

  const goBack = () => screenNavigation.goBack()

  const [ searchWallet, setSearchWallet] = useState('')

  const wallet = new Ethereum();

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
        <WalletInfo pointerEvents="none">
          <WalletUserIcon />

          <WalletAddressTitle>
            {ethereumState.ethWalletEns}
          </WalletAddressTitle>

          <WalletAddressHex>
            {ethereumState.ethWalletHex}
          </WalletAddressHex>
          <WalletBalance>
            <WalletCurrencyIcon width={32} height={42} fill={theme.ui.icon} />
            <WalletAmount>
              {ethereumState.ethWalletBalance}
            </WalletAmount>
          </WalletBalance>
        </WalletInfo>
        <CloseButton onPress={goBack}>
          <CloseButtonText>Done</CloseButtonText>
        </CloseButton>
      </Header>
      <Body>
        <SearchWallet
          placeholder="Search by wallet address"
          value={searchWallet}
          onChangeText={(address: string) => {
            setSearchWallet(address);
          }}
          onSubmitEditing={(event) => {
            const search = event.nativeEvent.text
            console.log('TODO - Search for wallet information');
          }}
          autoCapitalize="none"
          autoCompleteType="off"
          autoCorrect={false}
          returnKeyType="search"
          keyboardAppearance={isDarkMode() ? 'dark' : 'light'}
          blurOnSubmit={true}
          clearButtonMode="always"
          textContentType="none" // TODO - URL and hex?
        />

      </Body>
    </>
  )
}



const Header = styled.View`
  background-color: ${props => props.theme.ui.background};
  padding: 20px 0;
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

const WalletInfo = styled.View`
  margin: 20px 20px 20px 20px;
`

const walletUserIconSize = `80px`;
const WalletUserIcon = styled.View`
  width: ${walletUserIconSize};
  height: ${walletUserIconSize};
  border-radius: ${walletUserIconSize};
  background-color: ${props => props.theme.colors.text};
	opacity: .25;
  margin: 0 0 20px 0;
`

const WalletAddressTitle = styled.Text`
  color: ${props => props.theme.colors.text};
  font-size: 24px;
  font-weight: 600;
`
const WalletAddressHex = styled.Text`
  color: ${props => props.theme.colors.text};
	opacity: .65;
  font-size: 13.5px;
`

const WalletBalance = styled.View`
  /* border: 1px solid red; */
  flex-direction: row;
  margin: 20px 0 0 0;
`

const WalletCurrencyIcon = styled(IconCurrencyEthereum)`
  /* border: 1px solid red; */
	margin: 3.5px 10px 0 0;

`

const WalletAmount = styled.Text`
  color: ${props => props.theme.colors.text};
  font-size: 42px;
  font-weight: 600;
`



const Body = styled.View`
  background-color: ${props => props.theme.ui.background};
  flex: 1;
`


const SearchWallet = styled.TextInput`
  font-size: 18px;
  text-align: left;
  padding: 10px;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 6px;
  background: ${props => props.theme.ui.foreground};
  color: ${props => props.theme.addressBar.color};
`;