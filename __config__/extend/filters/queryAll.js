module.exports = function(collection, property, values) {
	let matches = [];
	for(let i = 0; i < collection.length; i++) {
		if (Array.isArray(values)) {
			for(let j = 0; j < values.length; j++) {
				if (collection[i][property] === values[j]) {
					matches.push(collection[i]);
				}
			}
		} else {
			if (collection[i][property] === values) {
				matches.push(collection[i]);
			}
		}
	}
	return matches;
}