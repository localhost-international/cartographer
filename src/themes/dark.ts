import { DefaultTheme } from 'styled-components/native';

const theme: DefaultTheme = {
	colors: {
		scheme: 'dark',
		text: 'white',
		background: 'rgb(24,25,26)',
		debug: 'green',
	},
	ui: {
		background: 'rgba(24,25,26,.95)',
		foreground: 'rgba(0,0,0,.75)',
		icon: 'rgba(255,255,255,.5)',
	},
	addressBar: {
		background: 'rgba(255,255,255,.08)',
		color: 'rgba(255,255,255,1)',
	},
};

export default theme;
