/**
 * removeFalsyValuesFromObject
 * Takes an object, clones it, and removes any falsy key/value pairs from the clone.
 * @constructor
 * @param {object} obj - The target object
 * @returns {object}
 */
export function removeFalsyValuesFromObject(obj: object): object {
	const copy = {...obj};
	Object.keys(copy).forEach(function(k: string): void {
		// This is interesting, you can't set the casted key as a variable and re-use...
		// Learn why.
		if (!copy[k as keyof Object]) {
			delete copy[k as keyof Object];
		}
	});
	return copy;
}
