import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import { BlurView } from '@react-native-community/blur';

import { IsDarkMode } from 'src/utils/appearance';
import { useTheme } from 'styled-components/native';

import IconCurrencyEthereum from 'src/assets/icons/currencies/currency-ethereum.svg';
import { ethereumState } from 'src/store';

export default function Settings() {
  const theme = useTheme();

  const [ethState] = useRecoilState(ethereumState);

  const screenNavigation = useNavigation();

  const goBack = () => screenNavigation.goBack();

  const [searchWallet, setSearchWallet] = useState('');

  return (
    <>
      <BlurViewContainer blurType={IsDarkMode() ? 'dark' : 'light'} />
      <Header>
        <CloseButton onPress={goBack}>
          <CloseButtonText>Done</CloseButtonText>
        </CloseButton>
        <WalletInfo pointerEvents="none">
          <WalletUserIcon />
          <WalletAddressTitle>{ethState.ethWalletEns}</WalletAddressTitle>
          <WalletAddressHex>{ethState.ethWalletHex}</WalletAddressHex>
          <WalletBalance>
            <WalletCurrencyIcon width={32} height={42} fill={theme.ui.icon} />
            <WalletAmount>{ethState.ethWalletBalance}</WalletAmount>
          </WalletBalance>
        </WalletInfo>
      </Header>
      <Body>
        <SearchWallet
          placeholder="Search by wallet address"
          value={searchWallet}
          onChangeText={(address: string) => {
            setSearchWallet(address);
          }}
          onSubmitEditing={() => {
            console.log('TODO - Search for wallet information');
          }}
          autoCapitalize="none"
          autoCompleteType="off"
          autoCorrect={false}
          returnKeyType="search"
          keyboardAppearance={IsDarkMode() ? 'dark' : 'light'}
          blurOnSubmit={true}
          clearButtonMode="always"
          textContentType="none" // TODO - URL and hex?
        />
      </Body>
    </>
  );
}

const BlurViewContainer = styled(BlurView)`
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  top: 0;
`;

const Header = styled.View`
  background-color: ${(props) => props.theme.ui.background};
  padding: 20px 0;
`;

const CloseButton = styled.Pressable.attrs(() => ({
  hitSlop: 20,
}))`
  position: absolute;
  top: 24px;
  right: 24px;
`;
const CloseButtonText = styled.Text`
  color: ${(props) => props.theme.colors.text};
  font-size: 18px;
`;

const WalletInfo = styled.View`
  margin: 20px 20px 20px 20px;
`;

const walletUserIconSize = '80px';
const WalletUserIcon = styled.View`
  width: ${walletUserIconSize};
  height: ${walletUserIconSize};
  border-radius: ${walletUserIconSize};
  background-color: ${(props) => props.theme.colors.text};
  opacity: 0.25;
  margin: 0 0 20px 0;
`;

const WalletAddressTitle = styled.Text`
  color: ${(props) => props.theme.colors.text};
  font-size: 24px;
  font-weight: 600;
`;
const WalletAddressHex = styled.Text`
  color: ${(props) => props.theme.colors.text};
  opacity: 0.65;
  font-size: 13.5px;
`;

const WalletBalance = styled.View`
  /* border: 1px solid red; */
  flex-direction: row;
  margin: 20px 0 0 0;
`;

const WalletCurrencyIcon = styled(IconCurrencyEthereum)`
  /* border: 1px solid red; */
  margin: 3.5px 10px 0 0;
`;

const WalletAmount = styled.Text`
  color: ${(props) => props.theme.colors.text};
  font-size: 42px;
  font-weight: 600;
`;

const Body = styled.View`
  background-color: ${(props) => props.theme.ui.background};
  flex: 1;
`;

const SearchWallet = styled.TextInput`
  font-size: 18px;
  text-align: left;
  padding: 10px;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 6px;
  background: ${(props) => props.theme.ui.foreground};
  color: ${(props) => props.theme.addressBar.color};
`;
