// const crypto = require('crypto');

const chars12 = () => Math.round(Math.random() * 36 ** 12).toString(36);
const chars9 = () => Math.random().toString(36).substr(2, 9);
const timestamp = () => Date.now();

// // Note requires crypto library
// export const v4 = (): string => {
// 	return (`${1e7}-${1e3}-${4e3}-${8e3}-${1e11}`).replace(/[018]/g, (c: any) =>
// 		(c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
// 	);
// };

export default {
	chars12,
	chars9,
	timestamp,
};
