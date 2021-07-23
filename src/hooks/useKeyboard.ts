import { useState, useEffect } from 'react';
import { Keyboard } from 'react-native';

export const useKeyboard = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	useEffect(() => {
		Keyboard.addListener('keyboardDidShow', () => setIsOpen(true));
		Keyboard.addListener('keyboardDidHide', () => setIsOpen(false));
		return () => {
			Keyboard.removeAllListeners('keyboardDidShow');
			Keyboard.removeAllListeners('keyboardDidHide');
		};
	}, []);

	useEffect(() => {
		console.log('isKeyboardOpen?', isOpen);
	}, [isOpen]);

	return isOpen;
};
