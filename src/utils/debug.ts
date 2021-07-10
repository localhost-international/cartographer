export function randomSite(): string {
	const sites = [
		'https://duckduckgo.com/',
		'https://recoiljs.org/',
		'https://openzeppelin.com/',
		'https://status.im/',
		'https://beta.catalog.works/',
		'https://foundation.app/',
		'https://mirror.xyz/',
		'https://web3summit.com/',
	];
	return sites[Math.floor(Math.random() * sites.length)];
}
