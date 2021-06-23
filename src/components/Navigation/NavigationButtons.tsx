import React, { useContext } from 'react'
import { SafeAreaView } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import styled, { useTheme } from 'styled-components/native'

import { AppState } from 'src/store/reducers'


import IconArrowLeft from 'src/assets/icons/icon-arrow-left.svg'
import IconArrowRight from 'src/assets/icons/icon-arrow-right.svg'
import IconOptions from 'src/assets/icons/icon-options.svg'
import IconRefresh from 'src/assets/icons/icon-refresh.svg'
import IconTabs from 'src/assets/icons/icon-tabs.svg'

import { ButtonIcon } from 'src/components/ButtonIcon'


interface IconProps {
	type: string
}



const NavigationButtons = () => {

	const theme = useTheme()

	const screenNavigation = useNavigation()

	const navigation = useSelector((state: AppState) => state.navigation)
	const dispatch = useDispatch()

	const webViewReload = () => navigation.webViewRef.current.reload()
	// TODO - Make backward/forward inactive based on history 
	const webViewGoBack = () => navigation.webViewRef.current.goBack()
	const webViewGoForward = () => navigation.webViewRef.current.goForward()
	const viewSettings = () => screenNavigation.navigate('Settings')


	const navigationButtons = [
		{
			type: 'back',
			onPress: () => webViewGoBack(),
			iconImage: IconArrowLeft,
			accessibilityLabel: 'Go back'
		},
		{
			type: 'forward',
			onPress: () => webViewGoForward(),
			iconImage: IconArrowRight,
			accessibilityLabel: 'Go forward'
		},
		{
			type: 'tabs',
			onPress: () => { },
			iconImage: IconTabs,
			accessibilityLabel: 'List opened web-site tabs'
		},
		{
			type: 'reload',
			onPress: () => webViewReload(),
			iconImage: IconRefresh,
			accessibilityLabel: 'Reload web-page'
		},
		{
			type: 'options',
			onPress: () => viewSettings(),
			iconImage: IconOptions,
			accessibilityLabel: 'More Options'
		}
	];




	return (
		<SafeAreaView>
			<View>

				{
					navigationButtons.map((button) => {
						const { type, iconImage, accessibilityLabel, onPress } = button;
						return (
							<ButtonIcon
								type={type}
								key={`${button + type}`}
								accessibilityLabel={accessibilityLabel}
								onPress={onPress}
								iconImage={iconImage}
							/>
						)
					})
				}

			</View>
		</SafeAreaView>
	)
}


const iconSize = 32

const View = styled.View`
  margin-left: 16px;
  margin-right: 16px;
  padding-top: 8px;
  padding-bottom: 8px;
  flex-direction: row;
  justify-content: space-between;
`
const Icon = styled.Pressable.attrs({
	hitSlop: 10
})`
  height: ${iconSize}px;
  padding-top: 0;
  padding-right: 10px;
  padding-bottom: 0;
  padding-left: 10px;
  ${({ type }: IconProps) => type === 'tabs' && ``}
  ${({ type }: IconProps) => type === 'reload' && ``}
  ${({ type }: IconProps) => type === 'options' && ``}
`



export default NavigationButtons