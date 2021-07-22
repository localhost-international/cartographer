import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';

export const ORIENTATION = {
	LANDSCAPE: 'landscape',
	PORTRAIT: 'portrait',
};

export const getWindowOrientation = () => {
	const { width, height } = Dimensions.get('window');
	return height >= width ? ORIENTATION.PORTRAIT : ORIENTATION.LANDSCAPE;
};

export const useDeviceOrientation = () => {
	const [deviceOrientation, setDeviceOrientation] =
		useState(getWindowOrientation);
	useEffect(() => {
		function updateState() {
			setDeviceOrientation(getWindowOrientation());
		}
		Dimensions.addEventListener('change', updateState);
		return () => Dimensions.removeEventListener('change', updateState);
	}, []);
	return deviceOrientation;
};
