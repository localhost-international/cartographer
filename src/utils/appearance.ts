import { useState, useEffect } from 'react';
import { Appearance, useColorScheme } from 'react-native';

Appearance.getColorScheme();

export const IsDarkMode = () => {
	const [isDarkMode, setIsDarkMode] = useState(false);

	const colorScheme = useColorScheme();

	useEffect(() => {
		let mounted = true;
		setIsDarkMode(colorScheme === 'dark' ? true : false);
		Appearance.addChangeListener(() => {
			if (mounted) {
				setIsDarkMode(colorScheme === 'dark' ? true : false);
			}
		});
		return () => {
			mounted = false;
		};
	}, [isDarkMode, colorScheme]);

	return isDarkMode;
};
