import React, { useContext } from 'react'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import styled from 'styled-components/native'
import { BlurView } from '@react-native-community/blur'

import { isDarkMode } from 'src/utils/appearance'
import { useTheme } from 'styled-components/native'

import data from 'src/data/settings.json'

import { AppState } from 'src/store/reducers'

import IconCurrencyEthereum from 'src/assets/icons/currencies/currency-ethereum.svg'


export default function Settings() {

	const theme = useTheme()

  const ethereumState = useSelector((state: AppState) => state.ethereum)

  const screenNavigation = useNavigation()

  const goBack = () => screenNavigation.goBack()

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
