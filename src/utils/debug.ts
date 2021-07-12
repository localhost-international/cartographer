export function randomSite(): string {
	const sites = [
		'https://duckduckgo.com/',
		'https://bing.com/',
		'https://youtube.com/',
		'https://status.im/',
		'https://beta.catalog.works/',
		'https://web3summit.com/',
		'https://tmall.com/',
		'https://yahoo.co.jp/',
		'https://aparat.com/',
		'https://yandex.ru/',
		'https://www.tg4.ie/ga/',
		// 'https://qq.com/',
		// 'https://www.naver.com/',
		// 'https://sohu.com/',
		// 'https://www.sogou.com/',
		// 'https://360.cn/',
		// 'https://jd.com/',
		// 'https://foundation.app/',
		// 'https://mirror.xyz/',
		// 'https://recoiljs.org/',
		// 'https://openzeppelin.com/',
	];
	return sites[Math.floor(Math.random() * sites.length)];
}
