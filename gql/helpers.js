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