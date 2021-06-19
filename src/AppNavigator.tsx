import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'

import { useTheme } from 'styled-components/native'

import { env } from 'environments/.env.development'

import { AppState } from 'src/store/reducers'
import { 
  ETH_WALLET_ADDRESS, 
  ETH_WALLET_BALANCE,
	ETH_WALLET_HEX,
	ETH_WALLET_ENS
} from 'src/store/ethereum.reducer'

import { Ethereum } from 'src/protocols/ethereum'

import Browser from 'src/views/Browser'
import Settings from 'src/views/Settings'
import { ethers } from 'ethers'


const Stack = createStackNavigator()


export default function AppNavigator() {

  const theme = useTheme()

  const ethereumState = useSelector((state: AppState) => state.ethereum)
  const dispatch = useDispatch()

  useEffect(() => {

		const wallet = new Ethereum()
		wallet.walletPrivateKey = `${env.ETH_WALLET_SECRET_PRIVATE_KEY}`
		wallet.walletAddress = `${(env.ETH_WALLET_ADDRESS).toLowerCase()}`

		// Store users wallet address
		dispatch({
			type: ETH_WALLET_ADDRESS, 
			ethWalletAddress: wallet.walletAddress
		});


		(async() => {

			// Set hex and ENS wallet addresses
			dispatch({
				type: ETH_WALLET_ENS, 
				ethWalletEns: wallet.isAddressHex() ?
					await wallet.getEnsFromAddress() : 
					wallet.walletAddress
			});
			dispatch({
				type: ETH_WALLET_HEX, 
				ethWalletHex: wallet.isAddressENS() ? 
					await wallet.getAddressFromEns() : 
					wallet.walletAddress
			});

			dispatch({
				type: ETH_WALLET_BALANCE, 
				ethWalletBalance: await wallet.getBalance()
			});

    })();
  }, []);


  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Browser"
        screenOptions={{
          cardStyle: {
            backgroundColor: 'transparent'
          },
          cardOverlayEnabled: true,
          cardShadowEnabled: true,
          gestureEnabled: true,
					animationEnabled: true,
          ...TransitionPresets.ModalPresentationIOS,
          headerStyle: {
            borderBottom: 'none'
          },
        }}
        mode="modal"
        headerMode="screen"
        >
        <Stack.Screen
          name="Browser"
          component={Browser}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}