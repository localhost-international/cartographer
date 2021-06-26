import { DefaultTheme } from 'styled-components/native';

const theme: DefaultTheme = {
	colors: {
		scheme: 'light',
		text: 'black',
		title: 'rgba(100,100,100,1)',
		header: 'rgba(80,80,80,1)',
		background: 'rgb(228,229,230)',
		debug: 'red',
	},
	ui: {
		background: 'rgba(228,229,230,.8)',
		foreground: 'rgba(255,255,255,.75)',
		icon: 'rgba(125,125,125,1)',
	},
	addressBar: {
		background: 'rgba(0,0,0,.08)',
		color: 'rgba(0,0,0,1)',
	},
};

export default theme;
