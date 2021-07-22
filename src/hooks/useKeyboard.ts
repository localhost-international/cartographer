import { useState, useRef, useEffect } from 'react';
import { Keyboard } from 'react-native';

export const useKeyboard = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const keyboardShowListener = useRef<any>(null);
	const keyboardHideListener = useRef<any>(null);
	useEffect(() => {
		keyboardShowListener.current = Keyboard.addListener('keyboardDidShow', () =>
			setIsOpen(true),
		);
		keyboardHideListener.current = Keyboard.addListener('keyboardDidHide', () =>
			setIsOpen(false),
		);
		return () => {
			keyboardShowListener.current.remove();
			keyboardHideListener.current.remove();
		};
	}, []);
	useEffect(() => {
		console.log('isKeyboardOpen', isOpen);
	}, [isOpen]);
	return isOpen;
};
