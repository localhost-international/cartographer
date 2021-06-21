import React from 'react'
import { SvgProps } from 'react-native-svg';
import styled, { useTheme } from 'styled-components/native'



interface IconProps {
	type: string
};

interface ButtonIconProps {
	type: string;
	onPress: any;
	icon: object;
	accessibilityLabel: string;
};


export const ButtonIcon = ({
	type, onPress, icon, accessibilityLabel
}: ButtonIconProps) => {

	const theme = useTheme()
	

	const IconImage:any = icon
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
