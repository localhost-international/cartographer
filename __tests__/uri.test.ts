import { isUrl, isHtml, isInternal, upgradeUri } from 'src/utils/uri';


describe('Address is a URL', () => {
	test('is true', () => {
		expect(isUrl('https://www.mozilla.org/')).toBeTruthy();
	});
	test('is false', () => {
		expect(isUrl('Mozilla')).toBeFalsy();
	});
});


describe('Address source is HTML', () => {
	test('is true', () => {
		expect(isHtml({html: '<h1>Hello</h1>'})).toBeTruthy();
	});
	test('is false', () => {
		expect(isHtml({uri: 'https://mozilla.org/'})).toBeFalsy();
	});
});


describe('Address is internal URI scheme', () => {
	test('is true', () => {
		expect(isInternal('about:home')).toBeTruthy();
	});
	test('is false', () => {
		expect(isInternal('https://blank.page/')).toBeFalsy();
	});
});


describe('Upgraded URL', () => {
	test('is true', () => {
		expect(upgradeUri('mozilla.org')).toBe('http://mozilla.org/');
	});
});