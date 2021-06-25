import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';

import { env } from 'environments/.env.development';

import { ethereumState } from 'src/store/atoms';

import { Ethereum } from 'src/protocols/ethereum';

import Browser from 'src/views/Browser';
import Settings from 'src/views/Settings';

const Stack = createStackNavigator();

export default function AppNavigator() {
  const setEthereumState = useSetRecoilState(ethereumState);

  useEffect(() => {
    const wallet = new Ethereum();
    wallet.walletPrivateKey = `${env.ETH_WALLET_SECRET_PRIVATE_KEY}`;
    wallet.walletAddress = `${env.ETH_WALLET_ADDRESS.toLowerCase()}`;
    (async () => {
      setEthereumState({
        ethWalletAddress: wallet.walletAddress,
        ethWalletHex: wallet.isAddressENS()
          ? await wallet.getAddressFromEns()
          : wallet.walletAddress,
        ethWalletEns: wallet.isAddressHex()
          ? await wallet.getEnsFromAddress()
          : wallet.walletAddress,
        ethWalletBalance: await wallet.getBalance(),
      });
    })();
  });

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Browser"
        screenOptions={{
          cardStyle: {
            backgroundColor: 'transparent',
          },
          cardOverlayEnabled: true,
          cardShadowEnabled: true,
          gestureEnabled: true,
          animationEnabled: true,
          ...TransitionPresets.ModalPresentationIOS,
        }}
        mode="modal"
        headerMode="screen">
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
  );
}
