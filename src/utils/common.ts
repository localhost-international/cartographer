/**
 * Usage: [1, 2, 3].random()
 * @param Array
 */
export function random(arr: Array<any>) {
	return arr[Math.floor(Math.random() * arr.length)];
}
