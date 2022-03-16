/**
 * removeFalsyValuesFromObject
 * Takes an object, clones it, and removes any falsy key/value pairs from the clone.
 * @constructor
 * @param {object} obj - The target object
 * @returns {object}
 */
function removeFalsyValuesFromObject(obj) {
	const copy = {...obj};
	Object.keys(copy).forEach(function(k) {
		if (!copy[k]) {
			delete copy[k];
		}
	});
	return copy;
}

module.exports = {
	removeFalsyValuesFromObject
};