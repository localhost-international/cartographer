import React from 'react'
import { GestureResponderEvent } from 'react-native';
import { SvgProps } from 'react-native-svg';
import styled, { useTheme } from 'styled-components/native'


interface IconProps {
	type: string
};

interface ButtonIconProps {
	type: string
	onPress: (event: GestureResponderEvent) => void
	iconImage: React.FC<SvgProps>
	accessibilityLabel: string
};


export const ButtonIcon = ({
	type, onPress, iconImage, accessibilityLabel
}: ButtonIconProps) => {
	const theme = useTheme()
	const IconImage = iconImage
	return (
		<Icon 
			type={type} 
			accessibilityLabel={accessibilityLabel}
			onPress={onPress}
		>
			<IconImage height={iconSize} fill={theme.ui.icon} />
		</Icon>
	);
};


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
