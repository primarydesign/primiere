module.exports = function(collection, property, value) {
	for(let i = 0; i < collection.length; i++) {
		if (collection[i][property] === value) {
			return collection[i];
		}
	}
}