import { Alert } from 'react-native';

const isUrl = (uri: string) => {
	const expression =
		/[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.~#?&//=]*)/gi;
	const regex = new RegExp(expression);
	const result = uri.match(regex);
	return result;
};

const isInternal = (uri: string) => {
	const expression = /^(about|cartographer):/gi;
	const regex = new RegExp(expression);
	const result = uri.match(regex);
	return result;
};

export const upgradeUrl = (uri: string) => {
	if (isUrl(uri)) {
		if (!uri.startsWith('http')) {
			return `http://${uri}/`;
		}
		return uri;
	}
	if (isInternal(uri)) {
		// TODO - Implement about: URI scheme for internal pages
		console.log('Internal URI!');

		Alert.alert('about: URI scheme', 'Not yet implemented.\nCheck back soon.', [
			{ text: 'OK' },
		]);

		return;
	}
	return `https://duck.com/?q=${encodeURI(uri)}`;
};
